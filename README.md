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

Output

```
{
    title: "Cuties (2020)",
    thumbnailPotrait: "https://image.myfile.work/poster/tt9196192.jpg",
    rating: "3.1",
    quality: "WebRip",
    movieId: "145014",
    detail: {
      trailer: "https://www.youtube.com/embed/M0O7lLe4SmA",
      views: "11180",
      genre: "Drama",
      director: "Maïmouna Doucouré",
      actors: "Esther Gohourou, Fathia Youssouf, Ilanah Cami-Goursolas, Médina El Aidi-Azouni",
      country: "France",
      duration: "96 min",
      release: " 2020",
      thumbnailLandscape: "https://image.myfile.work/backdrop/backdrop-tt9196192.jpg",
      description: " Amy, an 11-year-old girl, joins a group of dancers named “the cuties” at school, and rapidly grows aware of her burgeoning femininity—upsetting her mother and her values in the process."
    }
},

...
```

#### GET Search by Category
https://api-filmapik.herokuapp.com/category?search=action

Output: 
```
{
    title: "Heroes Return (2021)",
    thumbnailPotrait: "https://image.myfile.work/poster/heroes-return-2021.jpg",
    rating: "",
    quality: "WEBDL",
    movieId: "145923",
    detail: {
        views: "17954",
        genre: "Action",
        duration: "",
        release: " 2021",
        thumbnailLandscape: "",
        description: " Warm and justice veteran Wu Wei (Lui), chemical expert Xu Zhilan (Xu Dongdong), undercover detective Gao Tianming (Yuan Biao) and others set up a temporary       special operation team to understand and rescue the hostages trapped on the island. They infiltrated the gathering point of hundreds of thugs, used their wealth of           knowledge and professional skills to make combat weapons"
    }
},

...
```

#### GET Link Google Drive
https://api-filmapik.herokuapp.com/play?id=142455

Output: 
```
{
  link: "https://drive.google.com/file/d/1hzKA1KwJAyZtWH_uaPb6EtVWHCO5NCv0/preview"
}
```
