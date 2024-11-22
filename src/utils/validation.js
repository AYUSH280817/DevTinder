//     const validator=require('validator');
//     const validateSignUpData=(req)=>{
//     const {firstName,lastName,email,password}=req.body;
//     if(!firstName || !lastName)
//     {
//         throw new Error("Name is not valid");
//     }
//     else if(firstName.length <3 || !firstName.length >=50 )
//     {
//         throw new Error("length of Name is not valid");
//     }
//     else if(!validator.isEmail(email))
//     {
//         throw new Error("email is not vaild");
//     }
//     else if(!validator.isStrongPassword(password))
//     {
//         throw new Error("please enter a strong password");
//     }
// }
// module.exports=validateSignUpData

const validateSignUpData=(req)=>{
const {firstName,lastName}=req.body;
if(!firstName && !lastName)
{
    throw new Error("first or last name is not given");
}
if((firstName <=3 && firstName >= 50) ||(lastName <=3 && lastName >= 50) )
{
    throw new Error("first or last name size is not valid")
}
}

const validateEditProfileData=(req)=>{
    const allowedEditFields=[
        "firstName",
        "lastName",
        "email",
        "photoUrl",
        "gender",
        "age"
    ];
   const isEditAllowed=Object.keys(req.body).every(field=>allowedEditFields.includes(field));
 
   return isEditAllowed
}

module.exports=
{
    validateSignUpData,
    validateEditProfileData,
}