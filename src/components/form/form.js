import React from 'react';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


const generateFee = () => {
  return (Math.random() * (0.0002 - 0.0001) + 0.0001).toFixed(4);
}

const generateBalance = () => {
  return (Math.random() * (30000 - 500) + 500).toFixed(4);
}

const substractFromBalance = (currentBalance, fee, amount) => {
   const result =  parseFloat(parseFloat(currentBalance) - (parseFloat(fee) + parseFloat(amount)).toFixed(4));
   return result;
}

export class XchangeForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      totalAmount: generateFee(),
      balance: generateBalance(),
      sending: false,
      success: false,
      error: false
    };

  }

  useEffect() {
    // Update the document title using the browser API
  }

  creditsAvailable = (async value => {
    if (!value) {
      return 'Required'
    }
    await sleep(400)
    if (
      value > this.state.balance
    ) {
      return 'Credito insuficiente!'
    }
  })

  validateAddress = value => ({
    error:
      !value || !/Hello World/.test(value)
        ? "Input must contain 'Hello World'"
        : null,
    warning:
      !value || !/^Hello World$/.test(value)
        ? "Input should equal just 'Hello World'"
        : null,
    success:
      value && /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(value)
        ? "Thanks for entering 'Hello World'!"
        : null
  });

  submitBtns(values){
    if(this.state.sending){
      return (
            <button type="submit" disabled className="btn btn-primary not-rounded">
              <span className=""> Enviando { parseFloat(values.amount).toFixed(4) } Btns ... </span>
            </button> 
      )
    } else {
      return (
          <button type="submit" className="btn btn-primary not-rounded">
            <span className=""> Enviar { parseFloat(values.amount).toFixed(4) } Btns</span>
          </button> 
      )
    }
  }

  showifErros(){
    if(this.state.error){
      return (
        <div className="mb2 p1 mt1 bg-red rounded animated fadeIn delay-1s">
          <p className="h3 white">Error en la transacción </p>
          <ul className="list-reset white"> 
            <li>Tu credito disponible es insuficiente </li>
          </ul>
        </div>
      )
    }
  }

  showifSuccess(balance, submittedValues){
    if(this.state.success){
      return (
        <div className="mb2 p1 mt1 bg-green rounded animated fadeIn delay-1s">
          <p className="h3 white">Transacción Completada </p>
          <ul className="list-reset white"> 

            <li>Has enviado: { submittedValues.amount } Bitcoins a la cuenta { submittedValues.address } </li>
            <li>Fee de servicio: { submittedValues.fee } </li>
            <li>Se a removido de tu cartera de creditos un total de { parseFloat(submittedValues.fee) + parseFloat(submittedValues.amount) } </li>
            <li>Tu credito disponible es { parseFloat(balance).toFixed(4) } </li>
          </ul>
        </div>
      )
    }
  }

  onSubmit = async values => {
    var balance = parseFloat(this.state.balance).toFixed(4);
    this.setState( { sending: true, success: false })
    await sleep(1000)
    // window.alert(JSON.stringify(values, 0, 2))
    this.setState( { sending: false, 
      submittedValues: values, 
      balance: substractFromBalance(balance, values.fee, values.amount), 
      success: true,
      error: true
    } )
  }

  render() {
    return (
      <div className="clearfix flex mt2">
      <div className="col md-col-8 sm-col-10 mx-auto">
      <Form 
      onSubmit={this.onSubmit} 
      initialValues={{'fee': this.state.totalAmount, amount: 1000}}
      render={({ handleSubmit, form, submitting, pristine, invalid, values }) => (
          
          <form onSubmit={handleSubmit}
            id="form1" className="mb-4">
            <label className="regular h3" htmlFor="address"> Address btc </label>
            <br/>
            <Field
              className="input"
              name="address"
              component="input"
              required
              type="text"
              placeholder="3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
            />
            <p className="italic">Ingrese la direccion de la billetera a la que desea enviar Btns.</p>
            
            <label className="regular h3" htmlFor="amount"> Amount </label>
            <br/>
            <Field
              className="input"
              name="amount"
              component="input"
              type="number"
              placeholder=""
              step="0.0001"
              validate={this.creditsAvailable}
              required
              min={1000}
              max={200000}
            >{({ input, meta }) => (
              <div>
                <label>Username</label>
                <input {...input} className="input" type="number"
              placeholder=""
              step="0.0001" placeholder="" />
                {meta.error && meta.touched && <span className="red">{meta.error}</span>}
              </div>
            )}
            </Field>
            <p className="italic">Ingrese el monto que desea enviar. Puede variar entre 1000 a 200000 Btns. <br/> Tu credito disponible es de <span className="green">{ parseFloat(this.state.balance).toFixed(4) }</span>.</p>
            

            <label className="regular h3" htmlFor="fee"> Fee </label>
            <br/>
            <Field
              className="input"
              name="fee"
              component="input"
              type="number"
              placeholder=""
              required
              disabled
            />
             <p className="italic">El impuesto es calculado aleatoriamente para este examen.</p>
             <br/>

              { this.submitBtns(values) }

            <div>{JSON.stringify(invalid)}</div>     
          </form>
          )}
          />
          
          { this.showifErros() }

          { this.showifSuccess(this.state.balance, this.state.submittedValues) }
          
      </div>
      </div>
    );
  }
}
