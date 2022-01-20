# Home Page app API

This app is created using serverless architecture and Terrform to provide api end point to suppor the Home Page app UI.

## Usage

### Prerequisites

Before starting you need to make sure that you have following:
  - An AWS account IAM role with programatic access
  - Terraform CLI
  - Serverless CLi

### Deploy

To deploy the project configure the aws credentials by using this command

```
$ aws configure
```

Once you have configured the aws you need to run terraform commands to setup the architecture required for the project.

```
$ terraform init
$ terraform plan
$ terraform apply
```

Once you have created the architecture on AWS, copy the secrets.json.example file to secrets.json file and add the required keys in the file. After this you are ready to deploy the code and start using it. Use this command to deploy the code on the AWS infrastructure that you just created.
```
$ serverless deploy
```

### API End Points

This app provide these api end points:

#### /sendVerificationCode
##### METHOD:
POST

##### PARAMS:
{
  email: "admin@example.com",
  phone: "+13343434334"
}

##### Description:
This api end point accepts two params, an email and a phone number. If email address is passwed then it will send the generaed to code to email otherwise it will check if a phone number is passed and send the code on that number using twillio.

#### /verfiyCode
##### METHOD:
POST

##### PARAMS:
{
  email: "admin@example.com",
  phone: "+13343434334",
  code: "343434"
}
##### Description:
This end point will verify if the provided code matches the email or phone number in the databse.
