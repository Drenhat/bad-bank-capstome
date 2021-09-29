function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}


function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  
  const [user, setUser]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError]       = React.useState('');

  const ctx = React.useContext(UserContext);
   

  function validate(field, label) {
    //if will return false if any field is left blank
    if (!field) { 
        // setTimeout(() => {})  
        alert(`Error ${label}`)
        console.log('Error ' + label);
        // setTimeout(() => setError('', 3000))
        return false
    };
    //if the email doesn't include a '@' and a '.', it will return false
    if (field === email && (!field.includes('@') || !field.includes('.'))) {
        alert(`Enter a proper ${label}`)
        console.log('Error ' + label);
         return false    
    };
    //If the password is too short, it will return false
    if (field === password && field.length < 8) {
        alert(`Error ${label}. Your password must include at least 8 characters`)
        console.log('Error ' + label);
        setTimeout(() => setError('', 3000))
        return false    
    }
    return true
  }

  function handle(){
    //check that the fields are correct
    if(!validate(user, 'user')) return;
    if(!validate(email, 'email')) return;
    if(!validate(password, 'password')) return;

    console.log(user,email,password);
    const url = `/account/create/${user}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();
        //Clear the default user from the global variable
        ctx.users.pop() 
        //Add the new user into the global variable
        ctx.users = new Array (data);
        console.log(ctx);            
        console.log(data);        
    })();
    props.setShow(false);
  }    

  return (<>

    User Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter user name" 
      value={user} 
      onChange={e => setUser(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}