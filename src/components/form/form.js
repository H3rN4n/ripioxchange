import React from 'react';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';

import { generateBalance, generateFee, substractFromBalance, sleep, validateBalance, fakeRequest } from './form.services'

export class XchangeForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      fee: generateFee(),
      balance: generateBalance(),
      sending: false,
      success: false,
      error: false,
      errors: []
    };

  }

  creditsAvailable = (async value => {
    if (!value) {
      return 'Required'
    }
    if (
      !validateBalance(this.state.balance, this.state.fee, value)
    ) {
      return 'Credito insuficiente!'
    }
  })

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

  showForm() {
    if(!this.state.success){
      return (
        <Form 
          onSubmit={this.onSubmit} 
          initialValues={{'fee': this.state.fee, amount: 1000}}
          render={({ handleSubmit, form, submitting, pristine, invalid, values }) => (
            
            <form onSubmit={handleSubmit}
              id="form1" className="mb-4 animated fadeIn delay-1s">
              <label className="regular h3" htmlFor="address"> Direccion de la billetera </label>
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
              
              <label className="regular h3" htmlFor="amount"> Monto </label>
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
                  <label></label>
                  <input {...input} className="input" type="number"
                step="0.0001" placeholder="" />
                  {meta.error && meta.touched && <span className="red">{meta.error}</span>}
                </div>
              )}
              </Field>
              <p className="italic">Ingrese el monto que desea enviar. Puede variar entre 1000 a 200000 Btns. <br/> Tu credito disponible es de <span className="green">{ parseFloat(this.state.balance).toFixed(4) }</span>.</p>
              

              <label className="regular h3" htmlFor="fee"> Impuesto de la red</label>
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
            </form>
          )}
        />
      )
    }
  }

  showifErros(){
    if(this.state.error){
      return (
        <div className="mb2 p2 mt1 bg-red rounded animated fadeIn delay-1s">
          <p className="h3 white">Error en la transacción </p>
          <ul className="list-reset white">
            {this.state.errors.map((err, i) => {
            return <li key={i}>{err}</li>
            })}
          </ul>
        </div>
      )
    }
  }

  showifSuccess(balance, submittedValues){
    if(this.state.success){
      return (
        <div className="mb2 p2 mt1 bg-green rounded animated fadeIn delay-1s">
          <p className="h3 white">Transacción Completada </p>
          <ul className="list-reset white"> 

            <li>Has enviado: { submittedValues.amount } Bitcoins a la cuenta { submittedValues.address } </li>
            <li>Fee de servicio: { submittedValues.fee } </li>
            <li>Se a removido de tu cartera de creditos un total de { parseFloat(submittedValues.fee) + parseFloat(submittedValues.amount) } </li>
            <li>Tu credito disponible es { parseFloat(balance).toFixed(4) } </li>
          </ul>

          <button type="button" onClick={this.resetForm.bind(this)} className="btn btn-primary not-rounded">
            <span className=""> Nueva Transacción</span>
          </button> 

        </div>
      )
    }
  }

  resetForm(){
    this.setState( { sending: false, success: false, error: false })
  }

  onSubmit = async values => {
    const balance = parseFloat(this.state.balance).toFixed(4);
    this.setState( { sending: true, success: false, error: true })
    await sleep(1000)

    //@Todo fake responses timeout, 400 and 500 
    // window.alert(JSON.stringify(values, 0, 2))

    let fakeRequestResult = await fakeRequest();
    if(!fakeRequestResult.isValid){
      this.setState({ 
        sending: false, 
        submittedValues: values,
        success: false,
        error: true,
        errors: fakeRequestResult.errors
      })
    } else {
      this.setState({ 
        sending: false, 
        submittedValues: values, 
        balance: substractFromBalance(balance, values.fee, values.amount), 
        success: true,
        error: false
      })
    }
    
  }

  render() {
    return (
      <div className="clearfix flex mt2">
        <div className="col md-col-8 sm-col-10 mx-auto">
            { this.showForm() }
            { this.showifErros() }
            { this.showifSuccess(this.state.balance, this.state.submittedValues) }
        </div>
      </div>
    );
  }
}
