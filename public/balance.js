function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [balance, setBalance] = React.useState('');  

  const ctx = React.useContext(UserContext);
  let email;
  let counter = 0;

  console.log(ctx[0].isConnected);

  if(ctx[0].isConnected !== true) {
    counter = 0;
  } else {
    counter = 1;
    //update the email only if the user is connected
    email = ctx[0].email
  }

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(text);
            props.setShow(false);
            setBalance(user.balance);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  if (counter == 1) {

    return (<>

      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>

      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Check Balance
      </button>

    </>);
  } else {
    return (
      <h5>You are not logged in</h5>
    )
  }
}