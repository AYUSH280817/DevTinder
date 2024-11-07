    const validator=require('validator');
    const validateSignUpData=(req)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }
    else if(firstName.length <3 || !firstName.length >=50 )
    {
        throw new Error("length of Name is not valid");
    }
    else if(!validator.isEmail(email))
    {
        throw new Error("email is not vaild");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("please enter a strong password");
    }
}
module.exports=validateSignUpData