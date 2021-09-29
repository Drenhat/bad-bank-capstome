function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');

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
    fetch(`/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }

  if (counter == 1) {
    return(<>

      <h5>{email}</h5><br/>

      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}/><br/>

      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Withdraw
      </button>
    </>);
    } else {
      return (
        <h5>You are not logged in</h5>
      )
    }
}
