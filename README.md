# expressjs-apifacebook-simpleapp
## Instruksi instalasi dan menjalankan aplikasi

Dalam projek ini terdapat 2 aplikasi dengan nama folder :

 - **apifacebook**
 - **appinventory**
	 - dengan file **.sql**

Spesifikasi program pendukung untuk aplikasi ini :
-   NodeJS v10.13.0 atau terbaru    
-   Npm 6.7.0 atau terbaru
-  PostgreSql v11

untuk memulai menjalankan salah satu aplikasi pastikan npm, node js, dan database postgresql sudah terinstall dengan spesifikasi diatas ,jika sudah kemudian mulai dengan meng copy projek atau clone projek ini dengan cara :
```
git clone https://github.com/eqqi33/expressjs-apifacebook-simpleapp.git
```
lalu masuk kedalam folder expressjs-apifacebook-simpleapp

    cd expressjs-apifacebook-simpleapp

kemudian pilih salah satu projek yang akan dijalankan, contoh:
	

    cd apifacebook
 
setelah masuk ke dalam folder aplikasi, jalankan perintah

    npm install

setelah itu jalan kan perintah

    DEBUG=apifacebook:* npm run start

maka program akan berjalan sesuai dengan portnya dan coba akses url http://localhost:[port] dibrowser, contoh:

    http://localhost:3000
 
 **Note :**
	 

 - untuk aplikasi apifacebook menggunakan port 3000 saat akses pada browser
 - untuk aplikasi apifacebook user harus login facebook dengan akun yang tercantum pada tes soal karena aplikasi memakai developer facebook versi development
 - untuk aplikasi appinventory menggunakan port 4000 saat akses browser

 

 
