# 🛍️ Fashion E-commerce Platform – Requirements

## 📌 Functional Requirements

### 🔓 Public Functions
- **Sign up**  
  - Register with email and password.  
  - Verify by email & token.  

- **Sign in**  
  - Login with email/username & password.  

- **Sign out**  
  - Logout, remove session/token.  

- **Reset password**  
  - Verify by email & token.  
  - Update new password.  

- **Roles (4 types)**  
  - **Admin**  
  - **Manager**  
  - **User**  
  - **Guest**

---

### 👑 Admin Role

#### Dashboard
- Display statistics:  
  - Revenue.  
  - User statistics.  
  - Product statistics.  
  - Category statistics.  
  - Order statistics.  
  - Feedback statistics.  
- Sales graph over time.  

#### User & Profile Management
- CRUD user.  
- Role assignment (delegation).  
- Paging.  
- Search.  
- Filter by role.  

#### Backup Database Management (extendable)
- Paging.  
- Export & Import database.  
- Manage backup history.  
- Create new backup.  

#### Footer Information Management
- CRUD footer information (contact, social media, policies).  

---

### 📦 Manager Role

#### Category Management
- CRUD category.  
- Paging.  
- Search by name.  

#### Product Management
- CRUD product (images, price, description, size, color).  
- Paging.  
- Search by name.  
- Filter by category.  

#### Order Management
- CRUD orders.  
- Update order status: **Confirmed / Shipped / Canceled**.  
- Paging.  
- Filter by date.  

#### Feedback Management
- CRUD feedback.  
- Paging.  
- Search by username or content.  
- Filter by date or category.  

---

### 👤 User Role

#### Profile Management
- Update & view profile.  

#### Shopping
- View categories.  
- View products.  
- Add products to cart.  
- Checkout & payment.  

#### Order History
- View order status.  

#### Feedback
- Create product feedback (rating + comment).  

---

### 👥 Guest Role
- View categories.  
- View products.  
- Add products to cart.  
- Create shipping address info.  
- Checkout & payment.  

---

## ⚙️ Non-Functional Requirements

### 🔒 Security
- Hash password (BCrypt/Argon2).  
- Protect API with token (JWT).  
- Store tokens on server-side.  
- CORS support for frontend-backend communication.  

### 📱 Responsiveness
- Compatible with desktop, tablet, and mobile devices.  

### 📈 Scalability
- Support large numbers of users, products, and orders.  

### 🌐 SEO
- SEO-friendly URLs & meta tags.  

### ⚡ Performance
- Support concurrent access (X users at the same time).  
- Optimize queries & cache frequently used data.  

### 🛠️ Monitoring & Alerting
- Log key actions.  
- Error monitoring & automatic alerts.  
