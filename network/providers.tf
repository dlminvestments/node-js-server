terraform {
  required_version = "~>0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.70.0"
    }
  }
  backend "remote" {}
}

provider "aws" {
  region = var.region
}
