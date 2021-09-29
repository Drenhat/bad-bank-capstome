function AllData(){
    // const [data, setData] = React.useState('');
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');      

    return (<>
        <Card
        bgcolor="info"
        header="Alldata"
        status={status}
        body={show ?
            <AlldataForm setShow={setShow} setStatus={setStatus}/> :
            <AlldataMsg setShow={setShow} setStatus={setStatus}/>}
    />
    </>);
}

function AlldataMsg(props){
    return ( <>
        <h5>You Have to connect first</h5>
    </>
    )
}

function AlldataForm(props) {

    const [data, setData] = React.useState('');

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

    React.useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));                
            });

    }, []);

    if (counter == 1) {

    return (<>
        User<br/>
        <h5>{data}</h5> <br/>   
      </>);
    } else {
        return (
          <h5>You are not logged in</h5>
        )
      }
}
