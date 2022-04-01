data "aws_availability_zones" "available" {
  state = "available"
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.14.0"

  name = var.name

  cidr = "172.31.0.0/16"

  azs                = [data.aws_availability_zones.available.names[0], data.aws_availability_zones.available.names[1], data.aws_availability_zones.available.names[2]]
  public_subnets     = ["172.31.0.0/20", "172.31.48.0/20", "172.31.32.0/20"]
  private_subnets    = ["172.31.16.0/20”, "172.31.80.0/20", "172.31.64.0/20"]
  enable_nat_gateway = true
  single_nat_gateway = true

  database_subnets             = ["172.31.0.0/20", "172.31.48.0/20", "172.31.32.0/20"]
  create_database_subnet_group = true

  tags = {
    Pipeline = var.name
  }

  vpc_tags = {
    Name = var.name
  }
}

