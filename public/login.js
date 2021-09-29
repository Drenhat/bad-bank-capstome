function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  const ctx = React.useContext(UserContext);
  console.log('lol')
  return(<>
    <h5>Welcome !</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        ctx.isConnected = false
        props.setShow(true)}
      }>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);

  let counter = 0;

  console.log(ctx[0].user);
  console.log(`is Connected ${ctx[0].isConnected}`);

  if(!ctx[0].isConnected) {
    counter = 0
  } else {
    counter = 1; 
  }

  function logOut() {
    setTimeout(function() {
      counter = 0
      //Clear the default user from the global variable
      ctx.pop();
      let data = [{
        user:'Tim',
        email:'timothee.huerne@gmail.com',
        password:'secret',
        balance:100,
        isConnected: false}]
      //Add the connected user into the global variable
      ctx.push(data);
    }, 72000)
  }

  function handle(){

    fetch(`/account/login/${email}/${password}`)
    
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            //Clear the default user from the global variable
            ctx.pop()
            //Add the connected user into the global variable
            ctx.push(data);
            ctx[0].isConnected = true;

            console.log(`ctx ${ctx[0].isConnected}`);
            counter += 1;
            console.log('JSON:', data);
            // start the timer until logout
            logOut()
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
            console.log(err)
        }
    });
  }

  // if (counter == 0) {
    return (<>

      Email<br/>
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
  
      <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
     
    </>);
//   }

//   else { 
//     return (
//         <h5>Welcome !</h5>
//     )    
//   }
  
}