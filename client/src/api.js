
export function createNewPatient(usergroup){

    let uriBase = `https://${window.location.hostname}`
    // let uriBase = process.env.NODE_ENV === 'development' 
    //          ? 'http://localhost:8080'
    //          : `https://${window.location.hostname}`

    return fetch(`${uriBase}/api/patients/create/${usergroup}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
    }).then(res => {return res.json()})

  }


export async function getForm(patientuid, formName){

        let uriBase = `https://${window.location.hostname}`
        // let uriBase = process.env.NODE_ENV === 'development' 
        //  ? 'http://localhost:8080'
        //  : `https://${window.location.hostname}`
        

        let results = await fetch(`${uriBase}/api/getform/${patientuid}/${formName}`)
           .then(res => res.json())
           .then(json => { return json[0].data.formData })
           .catch(error => { console.log(error) });

        return results
    }



      

export async function getReportCount(formName){
      
      let uriBase = `https://${window.location.hostname}`
      // let uriBase = process.env.NODE_ENV === 'development' 
      //          ? 'http://localhost:8080'
      //          : `https://${window.location.hostname}`

      let results = await fetch(`${uriBase}/api/getreportcount/${formName}`)
         .then(res => res.text())
         .then(res => JSON.parse(res) )
         .then(json => { return json })
         .catch(error => { console.log(error) });

      return results
  }


export async function getPatientsAndInfoForUser(org){

    let uriBase = `https://${window.location.hostname}`
    // let uriBase = process.env.NODE_ENV === 'development' 
    //          ? 'http://localhost:8080'
    //          : `https://${window.location.hostname}`

    let results = await fetch(`${uriBase}/api/patients/get/${org}`)
                          .then(res => res.json())
                          .then(json => { return json })

    return results

  }

export function updateForm(patientuid, formName, formData ){

      let uriBase = `https://${window.location.hostname}`
      // let uriBase = process.env.NODE_ENV === 'development' 
      //          ? 'http://localhost:8080'
      //          : `https://${window.location.hostname}`

      // console.log(formData)

      fetch(`${uriBase}/api/updateform/${patientuid}/${formName}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData }),
      })
        .then(res => res.text()) 
        .then(json => { console.log(json); })
        .catch(error => { console.log(error) });
    }

export function updatePatient(patientuid, patientData ){

      let uriBase = `https://${window.location.hostname}`
      // let uriBase = process.env.NODE_ENV === 'development' 
      //          ? 'http://localhost:8080'
      //          : `https://${window.location.hostname}`

      fetch(`${uriBase}/api/patients/update/${patientuid}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ patientData }),
      })
        .then(res => res.text()) 
        .then(json => { console.log(json); })
        .catch(error => { console.log(error) });
    }
