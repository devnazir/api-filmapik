# API FILMAPIK
API ini digunakan untuk mengambil data-data movies atau film yang ada di website filmapik.
Berikut ini beberapa data yang akan didapat
1. title
2. thumbnailPotrait
3. rating
4. quality
5. movieId
6. views
7. genre
8. director
9. actors
10. country
11. duration
12. release
13. thumbnailLandscape
14. description
15. video
16. trailer

| Pathname    | Memerlukan Parameter | Opsional Parameter      | Keterangan |
| ----------- | ------------------ | ----------------------- | ----- |
| search      | q                  | page, video, maxResult | untuk melakukan pencarian movie |
| latest      |                    | page, video, maxResult | untuk mendapatkan data-data movies terbaru diupload |
| country     | search             | page, video, maxResult | untuk melakukan pencarian movie berdasarkan negara |
| category    | search             | page, video, maxResult | untuk melakukan pencarian movie berdasarkan kategori |
| play | q | | untuk melihat link video google drive |

| Parameter | Keterangan  | 
| --------- | ---------- |
| page      | digunakan untuk menentukan data movies pada halaman yang ditentukan |
| video     | digunakan jika ingin menampilkan link video pada google drive atau efek.stream (player filmapik), secara default nilai nya false. jika ingin menampilkan link google drive, isi parameter dengan nilai gdrive. Jika ingin menampilkan link efek.stream, isi parameter dengan nilai iframe.
| maxResult | digunakan untuk menentukan berapa jumlah movie yang akan ditampilam dalam satu halaman |
| q         | digunakan untuk melakukan pencarian movie / pencarian movie berdasarkan movieId. |
| search    | digunakan untuk melakukan pencarian movie berdasarkan negara/kategori |

## Pemakaian
https://api-filmapik.herokuapp.com/pathname?parameter

## Contoh
#### GET Search Movies
https://api-filmapik.herokuapp.com/search?q=avenger

#### GET Latest Movies
https://api-filmapik.herokuapp.com/latest

#### GET Search by Country 
https://api-filmapik.herokuapp.com/country?search=france

#### GET Search by Category
https://api-filmapik.herokuapp.com/category?search=action

#### GET Link Google Drive
https://api-filmapik.herokuapp.com/play?id=142455
