import base64
import hashlib
import time
import uuid

class EncryptionEngine:
    def __init__(self, master_key):
        self.master_key = hashlib.sha256(master_key.encode()).digest()

    def encrypt(self, plaintext):
        # Simulated AES-like encryption (base64 obfuscation with master key hash)
        combined = f"{self.master_key.hex()}:{plaintext}"
        return base64.b64encode(combined.encode()).decode()

    def decrypt(self, ciphertext):
        decoded = base64.b64decode(ciphertext.encode()).decode()
        key_hash, plaintext = decoded.split(":", 1)
        if key_hash != self.master_key.hex():
            raise ValueError("Invalid master key hash - decryption failed")
        return plaintext

class VaultEngine:
    def __init__(self, master_key):
        self.encryption = EncryptionEngine(master_key)
        self.storage = {} # namespace: path: {encrypted_value, metadata}
        self.leases = {}

    def create_secret(self, namespace, path, value, ttl=3600):
        if namespace not in self.storage:
            self.storage[namespace] = {}
        
        encrypted_value = self.encryption.encrypt(value)
        secret_id = str(uuid.uuid4())
        
        self.storage[namespace][path] = {
            "id": secret_id,
            "value": encrypted_value,
            "metadata": {
                "created_at": time.time(),
                "ttl": ttl,
                "version": 1
            }
        }
        return secret_id

    def get_secret(self, namespace, path):
        namespace_data = self.storage.get(namespace)
        if not namespace_data:
            return None
        
        secret_data = namespace_data.get(path)
        if not secret_data:
            return None
        
        decrypted_value = self.encryption.decrypt(secret_data["value"])
        return {
            "value": decrypted_value,
            "metadata": secret_data["metadata"]
        }

class PolicyEngine:
    def __init__(self):
        self.policies = {} # role: [rules]

    def add_policy(self, role, rules):
        self.policies[role] = rules

    def can_access(self, role, namespace, path, action="read"):
        role_rules = self.policies.get(role, [])
        for rule in role_rules:
            if rule["namespace"] == namespace and (rule["path"] == path or rule["path"] == "*"):
                if action in rule.get("actions", ["read"]):
                    return True
        return False
