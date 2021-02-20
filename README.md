# API FILMAPIK
### This API just for GET data movies includes link google drive or efek.stream(filmapik player)

| Pathname    | Required Parameter | Optional Parameter      |
| ----------- | ------------------ | ----------------------- |
| search      | q                  | page, gdrive, maxResult |
| latest      |                    | page, gdrive, maxResult |
| country     | search             | page, gdrive, maxResult |
| category    | search             | page, gdrive, maxResult |

| Parameter | Value      | Default Value | 
| --------- | ---------- | ------------- |
| page      | number     | 1             |
| gdrive    | boolean    | false         |
| maxResult | number     | 21            |
| q         | string     |               |
| search    | string     |               |

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
