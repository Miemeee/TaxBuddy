รหัสโครงงาน: ระบุรหัสโครงงานที่นี่ เช่น 68-1_17_nrc-r1

ชื่อโครงงาน (ไทย): แท็กซ์บัดดี้ เพื่อนคู่คิดเรื่องภาษี

Project Title (Eng): TAXBUDDY YOUR INTELLIGENT TAX PARTNER

อาจารย์ที่ปรึกษาโครงงาน: อ.ดร. นวฤกษ์ ชลารักษ์

ผู้จัดทำโครงงาน: 

นางสาว วรัญญา เรืองสวัสดิ์ waranya.ruan@dome.tu.ac.th

## ภาพรวมโปรแกรม

TaxBuddy เป็นแอปพลิเคชันเว็บ (Web Application) ที่ประกอบด้วยสองส่วน:

- **Frontend**: ส่วนแสดงผลให้ผู้ใช้ (React + Vite)
- **Backend**: ส่วนประมวลผลและจัดเก็บข้อมูล (Node.js + Express + Prisma)

---

## โครงสร้างโฟลเดอร์

```
TaxBuddy/
├── backend/                          # ส่วนแบ็กเอนด์
│   ├── src/
│   │   ├── app.js                    # ไฟล์หลักของแอปพลิเคชัน
│   │   ├── config/
│   │   │   └── prisma.js            # ตั้งค่าฐานข้อมูล Prisma
│   │   ├── controllers/              # จัดการตรรกะการทำงาน
│   │   │   ├── auth.controller.js
│   │   │   ├── dashboard.controller.js
│   │   │   ├── onboarding.controller.js
│   │   │   ├── simulation.controller.js
│   │   │   ├── tax.controller.js
│   │   │   ├── taxRecord.controller.js
│   │   │   ├── transaction.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── userDeduction.controller.js
│   │   │   └── userProfile.controller.js
│   │   ├── middleware/               # ส่วนประมวลผลกลาง
│   │   │   ├── auth.middleware.js   # ยืนยันตัวตน
│   │   │   ├── error.middleware.js  # จัดการข้อผิดพลาด
│   │   │   └── validate.middleware.js # ตรวจสอบข้อมูล
│   │   ├── routes/                   # เส้นทางของ API
│   │   │   ├── auth.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   ├── onboarding.routes.js
│   │   │   ├── simulation.routes.js
│   │   │   ├── tax.routes.js
│   │   │   ├── taxRecord.routes.js
│   │   │   ├── transaction.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── userDeduction.routes.js
│   │   │   └── userProfile.routes.js
│   │   ├── services/                 # ฟังก์ชันการทำงาน
│   │   │   ├── auth.service.js
│   │   │   ├── deductionEngine.service.js
│   │   │   ├── tax.service.js
│   │   │   ├── taxRecord.service.js
│   │   │   ├── token.service.js
│   │   │   ├── transaction.service.js
│   │   │   └── userDeduction.service.js
│   │   ├── utils/                    # ฟังก์ชันเสริม
│   │   │   └── taxBracket.util.js   # อัตราภาษี
│   │   └── validators/               # ตรวจสอบความถูกต้องของข้อมูล
│   │       └── auth.validator.js
│   ├── prisma/
│   │   ├── schema.prisma             # โครงสร้างฐานข้อมูล
│   │   ├── seed.js                   # เพิ่มข้อมูลตัวอย่าง
│   │   └── migrations/               # บันทึกการเปลี่ยนแปลงฐานข้อมูล
│   ├── uploads/                      # เก็บไฟล์ที่อัปโหลด
│   ├── server.js                     # เซิร์ฟเวอร์หลัก
│   ├── package.json                  # ไลบรารี่ที่ใช้ในแบ็กเอนด์
│   ├── .env                          # ตัวแปรสิ่งแวดล้อม (ไม่ให้เปิดเผย)
│   └── .gitignore                    # ไฟล์ที่ไม่ต้องการให้ Git ติดตาม
│
├── frontend/                         # ส่วนฟรอนท์เอนด์
│   ├── src/
│   │   ├── components/               # คอมโพเนนต์ React
│   │   │   ├── auth/                 # การเข้าสู่ระบบ
│   │   │   ├── common/               # คอมโพเนนต์ทั่วไป
│   │   │   ├── dashboard/            # แดชบอร์ด
│   │   │   ├── onboarding/           # ขั้นตอนเริ่มต้น
│   │   │   ├── profile/              # โปรไฟล์ผู้ใช้
│   │   │   ├── simulation/           # จำลองการคำนวณภาษี
│   │   │   └── transform/            # ประวัติการทำรายการ
│   │   ├── context/                  # React Context
│   │   │   ├── AuthContext.jsx       # ข้อมูลการเข้าสู่ระบบ
│   │   │   └── SimulationContext.jsx # ข้อมูลการจำลอง
│   │   ├── hooks/                    # Custom Hooks
│   │   ├── locales/                  # ไฟล์แปลภาษา
│   │   │   ├── en/
│   │   │   └── th/
│   │   ├── pages/                    # หน้าต่าง ๆ ของเว็บ
│   │   ├── services/                 # เรียก API
│   │   ├── theme/                    # ตั้งค่ารูปแบบ
│   │   ├── utils/                    # ฟังก์ชันเสริม
│   │   ├── App.jsx                   # ส่วนหลักของแอป
│   │   ├── main.jsx                  # จุดเริ่มต้น
│   │   └── i18n.js                   # ตั้งค่าภาษา
│   ├── public/                       # ไฟล์สาธารณะ
│   ├── cypress/                      # ทดสอบอัตโนมัติ
│   ├── package.json                  # ไลบรารี่ที่ใช้ในเฟรนต์เอนด์
│   ├── vite.config.js                # ตั้งค่า Vite
│   ├── .env                          # ตัวแปรสิ่งแวดล้อม
│   └── .gitignore                    # ไฟล์ที่ไม่ต้องการให้ Git ติดตาม
│
└── README.md                         # ไฟล์นี้

```

---

## ความต้องการระบบ

ก่อนติดตั้ง TaxBuddy โปรดตรวจสอบให้แน่ใจว่าคุณมีโปรแกรมต่อไปนี้:

### โปรแกรมที่จำเป็น:

| โปรแกรม | เวอร์ชันขั้นต่ำ | จุดประสงค์ |
|---------|----------------|-----------|
| **Node.js** | 18.x | รันเซิร์ฟเวอร์และโปรแกรมจำลอง |
| **npm** | 9.x | ติดตั้งไลบรารี่ |
| **Git** | 2.0+ | ดาวน์โหลดโปรแกรม |

### ฐานข้อมูล:

- **XAMPP** - สำหรับ MySQL, Apache

### อื่นๆ:

- **Visual Studio Code**  - สำหรับแก้ไขโค้ด

---

## การติดตั้ง

### 1. คัดลอกโปรแกรม

```bash
# ใช้ Git ดาวน์โหลดโปรแกรม
git clone https://github.com/ComSciThammasatU/2568-2_CS403_Final-Submission-68-1_17_nrc-r1.git
cd 2568-2_CS403_Final-Submission-68-1_17_nrc-r1
cd TAXBUDDY
```

### 2. ติดตั้งแบ็กเอนด์

```bash
# เข้าไปในโฟลเดอร์แบ็กเอนด์
cd backend

# ติดตั้งไลบรารี่ที่จำเป็น
npm install

# สร้างไฟล์สิ่งแวดล้อม
cp .env.example .env
# แล้วแก้ไขไฟล์ .env ด้วย editor ตามที่อธิบายในส่วนถัดไป
```

### 3. ติดตั้งฟรอนท์เอนด์

```bash
# กลับไปที่โฟลเดอร์หลัก
cd ../frontend

# ติดตั้งไลบรารี่ที่จำเป็น
npm install

---

## การตั้งค่า

### การตั้งค่าแบ็กเอนด์

สร้างไฟล์ `backend/.env` และเพิ่มข้อมูลต่อไปนี้:

```env
# ฐานข้อมูล
DATABASE_URL="mysql://root:@localhost:3306/taxbuddy"

# JWT Token
JWT_SECRET=supersecretkey123

# Google OAuth
GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com

```

### การติดตั้ง XAMPP

#### ขั้นตอนที่ 1: ดาวน์โหลดและติดตั้ง XAMPP

1. **ดาวน์โหลด XAMPP** จาก https://www.apachefriends.org/
   - เลือกเวอร์ชันสำหรับระบบปฏิบัติการของคุณ (Windows, macOS, Linux)
2. **ติดตั้ง** ตามขั้นตอนของตัวติดตั้ง
3. **เปิด XAMPP Control Panel**

#### ขั้นตอนที่ 2: เริ่มเซิร์ฟเวอร์

1. คลิก **Start** สำหรับ **Apache** (Web Server)
2. คลิก **Start** สำหรับ **MySQL** (ฐานข้อมูล)
3. ตรวจสอบให้แน่ใจว่ามีป้ายสีเขียว ✓ ข้างๆ ทั้งสองรายการ

#### ขั้นตอนที่ 3: สร้างฐานข้อมูล

1. เปิด **phpMyAdmin** ที่ http://localhost/phpmyadmin
2. คลิก **New** เพื่อสร้างฐานข้อมูลใหม่
3. ตั้งชื่อว่า `taxbuddy`
4. เลือก **Collation** เป็น `utf8mb4_unicode_ci`
5. คลิก **Create**

**ตัวอย่าง SQL สำหรับสร้างฐานข้อมูล:**

```sql
CREATE DATABASE taxbuddy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE taxbuddy;
```

**ขั้นตอนเพิ่มเติม:**

```bash
# สร้างฐานข้อมูล
cd backend
npx prisma migrate dev --name init

# เพิ่มข้อมูลตัวอย่าง (ทางเลือก)
npx prisma db seed
```

---

## วิธีการใช้งาน

### เริ่มต้นแอปพลิเคชัน

#### 1. รันแบ็กเอนด์

```bash
cd backend
npm start
```

เซิร์ฟเวอร์จะทำงานที่: `http://localhost:5000`

#### 2. รันเฟรนต์เอนด์

เปิด Terminal ใหม่:

```bash
cd frontend
npm run dev
```

แอปพลิเคชันจะเปิดที่: `http://localhost:5173`

---

## คำสั่งที่มีประโยชน์

### ติดตั้ง

```bash
# ติดตั้งไลบรารี่ทั้งหมด
npm install
```

### รัน (ทำงาน)

```bash
# รันในโหมดพัฒนา
npm run dev

# รันในโหมด Production
npm run build
npm start
```

### ทดสอบ

```bash
# รันการทดสอบอัตโนมัติ (Frontend)
npm run test

# รันการทดสอบ Cypress (E2E tests)
npm run cypress:open
```

### ฐานข้อมูล Prisma (Backend)

```bash
# ดูอินเทอร์เฟซจัดการฐานข้อมูล
npx prisma studio

# สร้างการย้ายข้อมูลใหม่
npx prisma migrate dev --name migration_name

# ตรวจสอบสถานะ
npx prisma migrate status

# รีเซตฐานข้อมูล (ข้อมูลทั้งหมดจะหาย)
npx prisma migrate reset
```

### ขยายโค้ด (Linting)

```bash
# ตรวจสอบไฟล์โค้ด
npm run lint

# แก้ไขปัญหาโดยอัตโนมัติ
npm run lint:fix
```

---

## วิธีการใช้โปรแกรม

### หน้าแรก (Welcome Page)
เมื่อเปิดแอปพลิเคชันครั้งแรก คุณจะเห็นหน้าต้อนรับ

### การลงทะเบียนและเข้าสู่ระบบ
- คลิก **ลงทะเบียน** หรือ **เข้าสู่ระบบ**
- กรอกข้อมูลอีเมลและรหัสผ่าน
- หรือใช้ Google Account เพื่อเข้าสู่ระบบ

### การตั้งค่าข้อมูล (Onboarding)
- กรอกข้อมูลรายได้
- เพิ่มช่องทางรายได้
- เพิ่มคนที่ต้องเลี้ยงดู (Dependents)
- เลือกการหักลดหย่อน

### บันทึกการทำรายการ (Transaction)
- ไปที่หน้า **ประวัติการทำรายการ**
- คลิก **เพิ่มรายการใหม่**
- กรอกรายละเอียดการทำรายการ

### แดชบอร์ด (Dashboard)
- ดูสรุปข้อมูลรายได้และภาษี
- ดูคำแนะนำการหักลดหย่อน

### จำลองภาษี (Simulation)
- ไปที่หน้า **จำลองภาษี**
- เลือกรายได้และการหักลดหย่อน
- ดูผลการคำนวณภาษีที่คาดการณ์ไว้

### ดาวน์โหลดรายงาน (PDF)
- ไปที่แดชบอร์ด
- คลิก **ดาวน์โหลด PDF**

---

## การแก้ไขปัญหา

### ปัญหา: แบ็กเอนด์ไม่เชื่อมต่อ

```bash
# ตรวจสอบว่า backend กำลังทำงาน
curl http://localhost:5000/api/health

# ตรวจสอบไฟล์ .env
# ตรวจสอบ DATABASE_URL
```

### ปัญหา: ฐานข้อมูลไม่พร้อม

```bash
# สร้างฐานข้อมูลใหม่
cd backend
npx prisma db push

# หรือดำเนินการย้ายข้อมูล
npx prisma migrate deploy
```

### ปัญหา: Packages ไม่ติดตั้ง

```bash
# ลบ node_modules
rm -rf node_modules
npm cache clean --force

# ติดตั้งใหม่
npm install
```

---

## ข้อมูลอื่นๆ

### ไลบรารี่ที่ใช้

**Backend:**
- Express.js - เฟรมเวิร์ก
- Prisma - ORM ฐานข้อมูล
- JWT - ยืนยันตัวตน
- Bcrypt - เข้ารหัสรหัสผ่าน

**Frontend:**
- React - ไลบรารี UI
- Vite - เครื่องมือพัฒนา
- Axios - เรียก API
- React Router - นำทาง
- i18n - แปลภาษา
