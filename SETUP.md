```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20.12.2

sudo apt install mysql-server
sudo systemctl start mysql.service
sudo mysql
```

```sql
mysql > ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
mysql > exit
```

```bash
sudo mysql_secure_installation
mysql -u root -p
```

```sql
pw > password
mysql > ALTER USER 'root'@'localhost' IDENTIFIED WITH auth_socket;
mysql > CREATE DATABASE booking_ac;
mysql > CREATE USER 'raspberrypi'@'localhost' IDENTIFIED BY 'raspberrypi';
mysql > GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP ON booking_ac.* TO 'raspberrypi'@'localhost';
```

```bash
cp .env.example .env
nano .env
npx prisma db push
```

```bash
npm run build
npm start
```