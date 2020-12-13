let username = document.getElementById('username')
let email = document.getElementById('email')
let phone = document.getElementById('phone')
let adduser = document.getElementById('adduser')
let deletealluser = document.getElementById('deletealluser')

adduser.addEventListener('click', (e) => {
    e.preventDefault();

    let usernameVal = username.value;
    let emailVal = email.value;
    let phoneVal = phone.value;

    if(usernameVal.trim()!=0 && emailVal.trim()!=0 && phoneVal.trim()!=0) {
        let localstore = localStorage.getItem('localtask')
        if(localstore == null) {
            userObj = [];
        }
        else {
            userObj = JSON.parse(localstore)
        }
        userObj.push({
            username : usernameVal,
            email : emailVal,
            phone : phoneVal
        })
        localStorage.setItem('localtask', JSON.stringify(userObj))
    }

    listuser();
    username.value = ''
    email.value = ''
    phone.value = ''
})

const listuser = () => {
    let localStore = localStorage.getItem('localtask')
    if(localStore == null) {
        userObj = [];
    } else {
        userObj = JSON.parse(localStore)
    }

    let users = ''
    let adduserlist = document.getElementById('adduserlist')
    userObj.forEach((user, i) => {
        users += `
            <tr>
                <td>${i + 1}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td class="text-center"><i class="fas fa-user-edit" onclick="editUser(${i})"></i></td>
                <td class="text-center"><i class="fas fa-trash" onclick="deleteUser(${i})" ></i></td>
            </tr>
        `
    })
    adduserlist.innerHTML = users
}
listuser();

// Edit User Function
const editUser = (i) => {
    let saveusernameindex = document.getElementById('saveusernameindex')
    let saveemailindex = document.getElementById('saveemailindex')
    let savephoneindex = document.getElementById('savephoneindex')

    saveusernameindex.value = i
    saveemailindex.value = i
    savephoneindex.value = i

    let localStore = localStorage.getItem('localtask')
    let userObj = JSON.parse(localStore)
    username.value = userObj[i].username
    email.value = userObj[i].email
    phone.value = userObj[i].phone 
}

// Update User Function
let updateuser = document.getElementById('updateuser')
updateuser.addEventListener('click', () => {
    let localStore = localStorage.getItem('localtask')
    let userObj = JSON.parse(localStore)

    let saveusernameindex = document.getElementById('saveusernameindex').value
    let saveemailindex = document.getElementById('saveemailindex').value
    let savephoneindex = document.getElementById('savephoneindex').value

    userObj[saveusernameindex].username = username.value;
    userObj[saveemailindex].email = email.value;
    userObj[savephoneindex].phone = phone.value;          

    localStorage.setItem('localtask', JSON.stringify(userObj))

    username.value = ''
    email.value = ''
    phone.value = ''
    
    listuser()
})

// Delete Single User Function
const deleteUser = (i) => {
    let localStore = localStorage.getItem('localtask')
    let userObj = JSON.parse(localStore)
    userObj.splice(i, 1)
    localStorage.setItem('localtask', JSON.stringify(userObj))
    listuser()
}

// Delete All User Function
deletealluser.addEventListener('click', () => {
    let localStore = localStorage.getItem('localtask')
    let userObj = JSON.parse(localStore)
    if(localStore == null) {
        userObj = [];
    } else {
        userObj = JSON.parse(localStore)
        userObj = [];
    }
    localStorage.setItem('localtask', JSON.stringify(userObj))
    listuser()
})