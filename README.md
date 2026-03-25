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



