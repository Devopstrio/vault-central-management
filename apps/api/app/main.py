from fastapi import FastAPI, Body, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from core.vault.engine import VaultEngine, PolicyEngine
import os

app = FastAPI(title="Vault Central Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MASTER_KEY = os.getenv("VAULT_MASTER_KEY", "default-dev-key")
vault = VaultEngine(MASTER_KEY)
policy_engine = PolicyEngine()

# Seed basic policy
policy_engine.add_policy("admin", [{"namespace": "root", "path": "*", "actions": ["read", "write", "delete"]}])
policy_engine.add_policy("app-reader", [{"namespace": "apps", "path": "app-01/*", "actions": ["read"]}])

@app.get("/health")
def health():
    return {"status": "ok", "service": "vault-central-management"}

@app.post("/secrets/create")
def create_secret(data: dict = Body(...)):
    namespace = data.get("namespace", "root")
    path = data.get("path")
    value = data.get("value")
    role = data.get("role", "admin")

    if not policy_engine.can_access(role, namespace, path, "write"):
        raise HTTPException(status_code=403, detail="Permission denied")

    secret_id = vault.create_secret(namespace, path, value)
    return {"status": "CREATED", "secret_id": secret_id}

@app.post("/secrets/access")
def access_secret(data: dict = Body(...)):
    namespace = data.get("namespace", "root")
    path = data.get("path")
    role = data.get("role", "app-reader")

    if not policy_engine.can_access(role, namespace, path, "read"):
        raise HTTPException(status_code=403, detail="Permission denied")

    secret = vault.get_secret(namespace, path)
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found")
    
    return {"secret": secret}

@app.get("/secrets")
def list_secret_metadata():
    inventory = []
    for ns, paths in vault.storage.items():
        for path, data in paths.items():
            inventory.append({
                "namespace": ns,
                "path": path,
                "id": data["id"],
                "created_at": data["metadata"]["created_at"]
            })
    return {"secrets": inventory}

@app.get("/dashboard/summary")
def get_dashboard_summary():
    total_secrets = sum(len(paths) for paths in vault.storage.values())
    return {
        "total_secrets": total_secrets,
        "active_leases": 142,
        "policy_violations": 0,
        "last_rotation": "2024-05-02T10:00:00Z"
    }

@app.get("/audit/logs")
def get_audit_logs():
    return {
        "logs": [
            {"timestamp": "2024-05-02T11:45:00Z", "actor": "admin", "action": "CREATE_SECRET", "target": "root/db_pass"},
            {"timestamp": "2024-05-02T11:48:00Z", "actor": "app-01", "action": "ACCESS_SECRET", "target": "apps/app-01/api_key"}
        ]
    }
