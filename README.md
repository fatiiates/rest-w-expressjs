# Typescript ve ExpressJS ile RESTFul Web Servis

## Mevcut Uç Noktalar

- /upload - POST, file parametresi gerektirir.
- /download - GET
- /register - POST, user_fullname: string, email: string, password: string, user_files: string parametreleri gereklidir.
- /login - POST, email: string, password: string parametreleri gereklidir.
- /logger - POST, id: string, user_token: string, user_fullname: string, filess: string, files_name: string, files_description: string parametreleri gereklidir.
- /logout - GET

## GEREKSİNİMLER
- NodeJS ^14.15.0
- npm ^6.14.8

## KURULUM

### NodeJS Mevcut Değilse 

Proje NodeJS üzerinde çalışmaktadır. NodeJs kurulu değilse aşağıdaki adres üzerinden indirebilirsiniz;
> NodeJS: https://nodejs.org/en/

### MySQL Veritabanı Ayarları
1. Deponun ana dizininde bulunan 'db.ts' içerisinde 4. satırda bulunan 'mysql.createConnection' fonksiyonuna verilen JSON nesnesini kendi makinenize uyarlamanız gerekiyor. 'mysql.createConnection' fonksiyonunun aldığı parametre olarak aldığı nesne aşağıdaki şekilde güncellenmelisiniz.
       
       {
           host: '[SİZİN_VERİTABANI_SUNUCUNUZ]',
           database: '[SİZİN_VERİTABANI_ADINIZ]',
           user: '[SİZİN_VERİTABANI_KULLANICI_ADINIZ]',
           password: '[SİZİN_VERİTABANI_KULLANICI_ŞİFRENİZ]'
       }
       
2. Veritabanı sunucunuzda 'restfulapi' adında bir veritabanı mevcutsa adını değiştirmeniz veya kaldırmanız gerekmektedir.
3. Veritabanını kendi bilgisayarınıza kurmak için bilgisayarınızda XAMPP'i açınız.
4. XAMMP üzerinden MySQL Admin butonuna tıklayarak PhpMyAdmin sayfasını açınız.
5. PhpMyAdmin sayfasında sol menüden restfulapi adında yeni bir veri tabanı oluşturunuz.
6. Açılan sayfada üst menüde çıkan IMPORT sekmesine tıklayınız.
7. Deponun ana dizinindeki restfulapi.sql dosyasını seçiniz ve yükleyiniz.

### Projeyi Çalıştırmak

1. Bilgisayarınızın komut satırı arayüzünü açın.
2. Dizin değiştirerek deponun bulunduğu dizinin içine gelin.
3. Paketleri kurmak için öncelikle aşağıdaki komutu çalıştırın.

       npm i

4. Daha sonra aşağıdaki komutu çalıştırın.

       npm start
       
5. Projeniz http://localhost:8080 varsayılan olarak 8080 portu üzerinde çalışmaya başlayacaktır.
6. Eğer ki 8080 portunda çalışan başka bir uygulama mevcut ise "server.ts" içerisinde 9. satırda bulunan port değerini değiştirin ve yeniden başlatın.
