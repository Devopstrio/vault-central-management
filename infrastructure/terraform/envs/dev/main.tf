module "vault_cluster" {
  source = "./modules/vault"

  cluster_size = 3
}

module "vault_storage" {
  source = "./modules/database"

  engine_version = "15.4"
}

resource "kubernetes_namespace" "vault_ops" {
  metadata {
    name = "vault-central-management"
  }
}

resource "aws_kms_key" "vault_master" {
  description             = "Master key for vault encryption-at-rest"
  deletion_window_in_days = 7
}

resource "aws_iam_role" "vault_server" {
  name = "vault-server-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}
