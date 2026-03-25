#  🚀 AWS Elastic Beanstalk + RDS + Secure EC2 Access Project

A fully deployed, cloud-ready AWS project built using **Elastic Beanstalk**, **Amazon RDS**, and **Amazon EC2**.  
This project demonstrates **real-world application deployment**, **managed database provisioning**, and **secure database access inside the same VPC**.

This setup includes:
- **Backend Web Application** (Node.js on Elastic Beanstalk)
- **Managed Database** (Amazon RDS MySQL created via Elastic Beanstalk)
- **Manual EC2 Instance** (used as a secure DB client machine)
- **Secure Networking** using **VPC + Security Groups**
- **Complete step-by-step guide**, including attached images for better understanding

---
# 🌟 1. Architecture Overview  

```
User
  |
  v
Elastic Beanstalk Environment (Node.js App)
  |
  v
Elastic Beanstalk EC2 Instance
  |
  v
Amazon RDS MySQL Database
  ^
  |
Manual EC2 Instance (DB Client)
```
**📸ARCHITECTURE IMAGE**

<img width="1536" height="1024" alt="Image" src="https://github.com/user-attachments/assets/f47e589c-194d-46e9-8f7d-ab699e021bfa" />

---

# 🗂 2. Project Structure  

```
eb-rds-project/
│
├── app.js
├── package.json
├── package-lock.json
├── node_modules/
├── eb-rds-project.zip
└── README.md
```

---

# 🧠 3. Prerequisites  
- AWS Account
- IAM user with admin access
- Region: ap-south-1 (Mumbai)
- Node.js and npm installed on local machine
- VS Code or any code editor
- EC2 key pair (dock.pem) downloaded
- Basic knowledge of:
   - Elastic Beanstalk
   - RDS
   - EC2
   - Security Groups
  

---

# ⭐ STEP 1 — Build Sample Web Application (Node.js + Express)
```
1. Create a folder in your local PC named **eb-rds-project**
2. Open this folder in VS Code
3. Create a file named **app.js**
4. Create a **package.json** file and paste the following code
```
---
**app.js**
```
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Elastic Beanstalk App is Running Successfully!");
});

// Required for Elastic Beanstalk
app.listen(process.env.PORT || 8080, () => {
  console.log("Server running...");
});
```
---

**package.json**
```
{
  "name": "eb-rds-demo",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```
---
**Install dependencies by running this command inside the project folder:**
```
npm install
```
After that, these will be created automatically:
- node_modules/
- package-lock.json
---
**📸APP.JS CODE  IMAGE**

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/29a52e57-6308-4b14-8555-de87e02b02f0" />

**📸PACKAGE.JSON CODE  IMAGE**

<img width="1920" height="695" alt="Image" src="https://github.com/user-attachments/assets/9d4a81af-8b4a-4c86-80c5-ccc59c8c147c" />

**📸 NPM INSTALL IMAGE**

<img width="1351" height="255" alt="Image" src="https://github.com/user-attachments/assets/aee712d4-0400-406f-bcf4-93c2ed91ffe3" />

---

# ⭐ STEP 2 — Create ZIP File for Elastic Beanstalk

- Now go to your project folder and select these files:
  - app.js
  - package.json
  - package-lock.json

Zip them into:

```
eb-rds-project.zip
```

⚠️ Important:
Zip the files inside the folder, not the outer folder itself.

---
**📸 ZIP FILE IMAGE**

<img width="1397" height="216" alt="Image" src="https://github.com/user-attachments/assets/83e066c8-ff26-4aa1-b8e0-c4c92a70367f" />

---

# ⭐ STEP 3 — Create Elastic Beanstalk IAM Roles

>⚠️ Note:
>These IAM roles are required during Elastic Beanstalk environment creation.
>AWS may ask for:
>1️⃣ A Service Role
>2️⃣ An EC2 Instance Profile

 # 1️⃣ Service Role

Choose trusted entity:
```
Elastic Beanstalk → Environment
```

Role name:
```
aws-elasticbeanstalk-service-role
```
Attach policies:
```
AWSElasticBeanstalkEnhancedHealth
AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy
```
Purpose:

**This role allows Elastic Beanstalk service itself to create and manage resources.**

# 2️⃣ EC2 Instance Profile

Choose trusted entity:
```
Elastic Beanstalk → Compute
```
Role name:
```
aws-elasticbeanstalk-ec2-role
```
Attach policies:
```
AWSElasticBeanstalkWebTier
AWSElasticBeanstalkWorkerTier
AWSElasticBeanstalkMulticontainerDocker
```
Purpose:

**This role is attached to the EC2 instance created by Elastic Beanstalk.**

---
**📸IAM SERVICE ROLE IMAGE**

<img width="1911" height="863" alt="Image" src="https://github.com/user-attachments/assets/9b74c8ce-3451-43e3-bd88-9158045d5f5f" />

<img width="1538" height="675" alt="Image" src="https://github.com/user-attachments/assets/a10d6940-5cd0-4506-9331-48a8b86f26a7" />

---

**📸IAM EC2 ROLE IMAGE**

<img width="1906" height="913" alt="Image" src="https://github.com/user-attachments/assets/1b3d6b65-8146-4e0c-b914-fabf788009bf" />

<img width="1887" height="830" alt="Image" src="https://github.com/user-attachments/assets/e3e19a98-9e08-4ace-92cc-0feb6fa728a1" />

---

# ⭐ STEP 4 — Create Elastic Beanstalk Environment

Go to:
```
AWS Console → Elastic Beanstalk → Create Environment
```

Environment Configuration
Application
```
Application name: eb-rds-demo
Environment name: Eb-rds-demo-env
Platform: Node.js 20 running on 64bit Amazon Linux 2023
Application code: eb-rds-project.zip
Preset: Single instance
```
Service Access
```
Service role: aws-elasticbeanstalk-service-role
EC2 instance profile: aws-elasticbeanstalk-ec2-role
EC2 key pair: dock
```
Networking
```
VPC: vpc-081a424483a3fbf9b
Public IP: Enabled
Instance subnets:
- subnet-01ae15e8cb5ae8d9d
- subnet-053d4acdf01fb676c
- subnet-0ea2c5fe23479024a
```

**📸ENV SETUP IMAGE**
<img width="1920" height="1031" alt="Image" src="https://github.com/user-attachments/assets/cd1c3ddd-6355-4334-95b6-bfeaf81dbb3b" />

<img width="1920" height="1028" alt="Image" src="https://github.com/user-attachments/assets/9fa9f3a4-7fe9-4ee0-9629-eb26e12b1203" />

<img width="1911" height="856" alt="Image" src="https://github.com/user-attachments/assets/284a790f-cb9a-4a3b-9c82-4d789bdbe0c3" />

<img width="1909" height="858" alt="Image" src="https://github.com/user-attachments/assets/94b57f9f-8eb8-452d-ad40-74277f998100" />

---

# ⭐ STEP 5 — Enable Integrated RDS During Elastic Beanstalk Setup

>During Elastic Beanstalk environment creation, enable the database option.
>This is the most important part of the project.

Database Configuration
```
Enable Database: Yes
Engine: MySQL
Engine Version: 8.4.7
Instance Class: db.t3.micro
Storage: 20 GB
Username: admin
Password: ********
Availability: Low (Single AZ)
Database Deletion Policy: Retain
```
---

Database Subnets
Choose the same VPC subnets:
```
subnet-01ae15e8cb5ae8d9d
subnet-053d4acdf01fb676c
subnet-0ea2c5fe23479024a
```

This ensures:

✅ RDS is launched inside the same VPC

---
**📸RDS ENABLE DURING EB SETUP**
<img width="1880" height="870" alt="Image" src="https://github.com/user-attachments/assets/23687b9a-32a5-41ad-9df0-9687f4d5ee3f" />

---
# ⭐ STEP 6 — Configure Instance Traffic and Scaling

Use simple configuration for cost-effective deployment.

```
Environment type: Single instance
Instance type: t3.micro
Architecture: x86_64
```
Leave most settings default unless specifically needed.

---

# ⭐ STEP 7 — Configure Monitoring and Logging

Use:
```
Health reporting: Enhanced
Log streaming: Enabled
Managed updates: Disabled
Proxy server: nginx
```
This helps monitor the environment health.

---

# ⭐ STEP 8 — Review and Create Environment

- Review all settings carefully and click:
- Create

Now Elastic Beanstalk will create:
```
Application environment
EC2 instance
RDS MySQL instance
Security groups
Supporting resources
```

**⏳ Wait until environment status becomes:**

```
Health: Green
Status: Ready
```

**📸ELASTIC BEANSTALK REVIEW IMAGE**

<img width="1894" height="821" alt="Image" src="https://github.com/user-attachments/assets/6978f6a4-5bf6-4f6f-a0ec-966c4d1d8a75" />
<img width="1891" height="841" alt="Image" src="https://github.com/user-attachments/assets/30668af8-412d-4bf6-a5c1-94596ba83a5a" />
<img width="1904" height="828" alt="Image" src="https://github.com/user-attachments/assets/6b7d4878-9ddc-44ee-9a2e-99f79cdcd236" />

---

# ⭐ STEP 9 — Verify Elastic Beanstalk App

After environment creation, open the Elastic Beanstalk domain URL.

Example:

```
http://YOUR-ELASTIC-BEANSTALK-URL
```

Expected output:

```
Elastic Beanstalk App is Running Successfully!
```
**📸APP RUNNING IMAGE**

<img width="1910" height="669" alt="Image" src="https://github.com/user-attachments/assets/7524d2a1-45e6-4414-bb6e-3781f4c33da1" />

---

# ⭐ STEP 10 — Verify RDS Database Created via Elastic Beanstalk

Go to:
```
AWS Console → RDS → Databases
```

- You should see the database automatically created by Elastic Beanstalk.

Example RDS Details
```
DB Identifier: awseb-e-t52yz3qddt-stack-awsebrdsdatabase-5rvckl60jh3t
Engine: MySQL Community
Class: db.t3.micro
Port: 3306
Database Name: ebdb
Master Username: admin
Publicly Accessible: No
VPC: vpc-081a424483a3fbf9b
```

This confirms:

✅ RDS is private and secure

**📸RDS DETAILS IMAGE**
<img width="1886" height="778" alt="Image" src="https://github.com/user-attachments/assets/8d8cce24-5267-48ac-b8b8-20088952e19f" />



---

# ⭐ STEP 11 — Launch Separate EC2 Instance for DB Access

- Now launch another EC2 instance manually.

- This EC2 is used only to:

  - 👉 securely connect to the RDS database

Go to:
```
AWS Console → EC2 → Launch Instance
EC2 Configuration
Name: rds-client-ec2
AMI: Ubuntu Server 24.04 LTS
Instance Type: t3.micro
Key Pair: dock
VPC: vpc-081a424483a3fbf9b
Auto-assign Public IP: Enabled
```

- Security Group for Manual EC2
- Create a security group:
  
```
Security Group Name: rds-client-ec2-sg
Inbound Rule:
SSH (22) → My IP
```
⚠️ Important:
Do not open MySQL port 3306 on this EC2, because this machine is only acting as a client, not as a database server.

# ⭐ STEP 12 — Understand the Two EC2 Instances

At this point, two EC2 instances exist:

1️⃣ Elastic Beanstalk EC2

This was created automatically by Elastic Beanstalk.

Purpose:
```
Runs the web application
```

2️⃣ Manual EC2 (rds-client-ec2)

This was created manually.

Purpose:
```
Used to SSH and connect to RDS securely
```

# ⭐ STEP 13 — Configure RDS Security Group to Allow DB Access

- This is the most important networking/security step.

Go to:
```
RDS → Your Database → Connectivity & Security
```

Find the RDS Security Group and open it.

Example:
```
sg-0880dddde2139e7c4
```
Existing Rule (Already Created by AWS)

- AWS already allows the Beanstalk environment to access RDS.

Example:
```
Inbound → sg-06a0dc1183c284b4f
```
That means:
```
Elastic Beanstalk EC2 → RDS = Allowed
```
Add New Rule for Manual EC2

Now add another inbound rule:
```
Type: MySQL/Aurora
Port: 3306
Source: Custom
Value: sg-0baae87e3965e31af (rds-client-ec2-sg)
```
Final RDS Inbound Rules Should Look Like:
```
MySQL 3306 ← Elastic Beanstalk Security Group
MySQL 3306 ← Manual EC2 Security Group
```

>⚠️ Important Security Note:
>Do NOT use:

- 0.0.0.0/0
 - Anywhere IPv4

**Because that would expose the database publicly.**

**📸RDS SECURITY GROUP RULES IMAGE**

<img width="1909" height="606" alt="Image" src="https://github.com/user-attachments/assets/2812bc8e-a382-4be2-82cc-9de9c2625bbb" />


# ⭐ STEP 14 — SSH into Manual EC2

Now connect to the manually created EC2 instance from your local machine.

Use:
```
ssh -i dock.pem ubuntu@43.205.145.78 

If using Windows PowerShell, run from the folder where dock.pem exists.

If you get key permission error in Git Bash:

chmod 400 dock.pem
ssh -i dock.pem ubuntu@43.205.145.78

Expected successful login:

ubuntu@ip-172-31-xx-xx:~$
```

# ⭐ STEP 15 — Install MySQL Client on EC2

After SSH login, install MySQL client:
```
sudo apt update
sudo apt install mysql-client -y
```
This allows the EC2 instance to connect to the RDS MySQL database.

# ⭐ STEP 16 — Connect to RDS from EC2

Use the RDS endpoint and credentials to connect.
```
mysql -h awseb-e-t52yz3qddt-stack-awsebrdsdatabase-5rvckl60jh3t.c3w2u4oek8lv.ap-south-1.rds.amazonaws.com -P 3306 -u admin -p
```

Then enter the RDS password.

If successful, you will see:
```
mysql>
```
That means:

🎉 EC2 successfully connected to RDS

**📸MYSQL CONNECTION IMAGE**

<img width="1920" height="1080" alt="MySQL Connection" src="ADD_YOUR_IMAGE_HERE" />


# ⭐ STEP 17 — Perform Database Operations

Now test database access using SQL commands.
```
1️⃣ Show Databases
SHOW DATABASES;

2️⃣ Use the Database
USE ebdb;

3️⃣ Create a Table
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50)
);

4️⃣ Insert a Record
INSERT INTO students (name) VALUES ('Vinit');

5️⃣ Read Data
SELECT * FROM students;

Expected Output
+----+-------+
| id | name  |
+----+-------+
|  1 | Vinit |
+----+-------+
```
This proves:

✅ Read/Write operations from EC2 to RDS are successful

**📸SQL OUTPUT IMAGE**

<img width="1920" height="1080" alt="SQL Output" src="ADD_YOUR_IMAGE_HERE" />

🎉 Project Working Successfully

✔ Web application deployed on Elastic Beanstalk
✔ RDS MySQL created via Elastic Beanstalk
✔ RDS launched in same VPC
✔ Manual EC2 launched successfully
✔ Security groups configured securely
✔ EC2 connected to RDS successfully
✔ SQL insert/select operations performed successfully

🔐 Security Considerations

This project follows secure AWS design practices:

RDS is not publicly accessible
Database access is restricted using Security Groups
Only these resources can access the DB:
Elastic Beanstalk EC2
Manual EC2
SSH access to manual EC2 is restricted to My IP only
No open database access to the public internet
