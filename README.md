# API FILMAPIK
API ini digunakan untuk mengambil data-data movies atau film yang ada di website filmapik

| Pathname    | Required Parameter | Optional Parameter      |
| ----------- | ------------------ | ----------------------- |
| search      | q                  | page, video, maxResult |
| latest      |                    | page, video, maxResult |
| country     | search             | page, video, maxResult |
| category    | search             | page, video, maxResult |
| play | q | |

| Parameter | Note  | 
| --------- | ---------- |
| page      | digunakan untuk menentukan data movies pada halaman yang ditentukan |
| video     | digunakan jika ingin menampilkan link video pada google drive atau efek.stream (player filmapik), secara default nilai nya false. jika ingin menampilkan link google drive, isi parameter dengan nilai gdrive. Jika ingin menampilkan link efek.stream, isi parameter dengan nilai iframe.
| maxResult | digunakan untuk menentukan berapa jumlah movie yang akan ditampilam dalam satu halaman |
| q         | digunakan untuk melakukan pencarian movie / pencarian movie berdasarkan movieId. |
| search    | digunakan untuk melakukan pencarian movie berdasarkan negara/kategori |
| play | digunakan untuk mencari movie berdasarkan movieId, value yang akan didapat yaitu link video google drive |

## Usage
https://api-filmapik.herokuapp.com/pathname?parameter

## Example
#### Search Movies
https://api-filmapik.herokuapp.com/search?q=avenger

#### Latest Movies
https://api-filmapik.herokuapp.com/latest

#### Search by Country 
https://api-filmapik.herokuapp.com/country?search=france

#### Search by Category
https://api-filmapik.herokuapp.com/category?search=action

# Note
#### if you want result with link google drive, input like this
https://api-filmapik.herokuapp.com/search?q=avenger&gdrive=true
  
