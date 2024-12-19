import React, { useEffect, useState } from 'react'
import questionIcon from '../../assets/questionMark.svg'
import deative from '../../assets/deactive.svg'
import reactive from '../../assets/reactiveIcon.svg'
import closeIcon from '../../assets/Close.svg'
import styles from './client.module.css'
import { Link } from 'react-router-dom'
import InputField from '../InputField/InputField'

const data = [
  {id: 1, name: 'Georgi', clinicianName: 'Georgi',  clientType: 'individual', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 2, name: 'Shubham', clinicianName: 'Shubham',  clientType: 'couple', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 3, name: 'Meet', clinicianName: 'Meet',  clientType: 'individual', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 4, name: 'Yash', clinicianName: 'Yash',  clientType: 'family', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 5, name: 'Raj', clinicianName: 'Raj',  clientType: 'group', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 6, name: 'samay', clinicianName: 'samay',  clientType: 'family', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 7, name: 'tanmay', clinicianName: 'tanmay',  clientType: 'group', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 8, name: 'dhruval', clinicianName: 'dhruval',  clientType: 'individual', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 9, name: 'manshi', clinicianName: 'manshi',  clientType: 'individual', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
];

const DeactivatedData = [
  {id: 101, name: 'Akshant', clinicianName: 'Akshant',  clientType: 'individual', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 102, name: 'Dhruv', clinicianName: 'Dhruv',  clientType: 'family', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
  {id: 103, name: 'Kushal', clinicianName: 'Kushal',  clientType: 'group', Lastsession: 'Oct 31, 2023', UnsavedNotes: 2320},
]

function Client() {

  const [clientType, setClientType] = useState(1); // Treatment OR Deactivated Client
  const [clientTypeForm, setClientTypeForm] = useState(1); // individual OR Couple Client
  const [ToggleForm, setToggleForm] = useState(false); // individual OR Couple Client
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedDeactivatedUser, setSelectedDeactivatedUser] = useState([]);
  const [allUser, setAlluser] = useState(data);
  const [deactivatedList, setDeactivatedList] = useState(DeactivatedData);

  const [findTreatmentClient, setFindTreatmentClient] = useState({
    clientName: '',
    clinicianName: '',
  });

  const [findDeactiveClient, setFindDeactiveClient] = useState({
    clientName: '',
    clinicianName: '',
  });

  const [formData, setFormData] = useState({
    clientType: 'individual',
    clientName1: '',
    clientName2: '',
    pronouns: 'He/Him',
    yearOfBirth: '',
    diagnosis: '',
    highRiskClient: '',
    extraNotes: '',
  })
  
  const handleTreatmentChange = (e) => {  
      const { name, value } = e.target;
      setFindTreatmentClient((pre) => ({
        ...pre,
        [name]: value
      }));
  }

  const handleDeactiveChange = (e) => {
      const {name, value} = e.target;
      setFindDeactiveClient(pre => ({
        ...pre,
        [name]: value
      }))
  }

  const handleFormChange = (e) => {
      const {name, value} = e.target;
      setFormData(pre => ({
        ...pre,
        [name]: value
      }))
  }

  useEffect(() => {
    formData.clientType === "individual" 
     ? setClientTypeForm(1) : setClientTypeForm(2);
    
  }, [formData.clientType])

  const isAllSelected = allUser.length > 0 && selectedUser.length === allUser.length;
  const isAllSelectedDeactivated = deactivatedList.length > 0 && selectedDeactivatedUser.length === deactivatedList.length;
  
  const handleSelectAll = (e) => {
    if(e.target.checked){
      setSelectedUser(allUser.map(users => users.id));
    }else{
      setSelectedUser([]);
    }
  }

  const handleSelectAllDeactivated = (e) => {
    if(e.target.checked){
      setSelectedDeactivatedUser(deactivatedList.map(users => users.id));
    }else{
      setSelectedDeactivatedUser([]);
    }
  }

  const handleSelectOne = (id) => {
    setSelectedUser((pre) => 
      pre.includes(id) ? pre.filter(userId => userId !== id) 
      : [...pre, id]
    )
  }

  // Deativated
  const handleSelectDeactivatedOne = (id) => {
    setSelectedDeactivatedUser((pre) => 
      pre.includes(id) ? pre.filter(userId => userId !== id) 
      : [...pre, id]
    )
  }

  // Deactive Button
  const handleDeactive = () => {
    const updatedList = allUser.filter(user => !selectedUser.includes(user.id));
    setAlluser(updatedList)

    const DeactiveList = allUser.filter(user => selectedUser.includes(user.id));
    setDeactivatedList(pre => [...pre, ...DeactiveList])
  }

  // Reactive Button 
  const handleReactive = () => {
    const updatedList = deactivatedList.filter(user => !selectedDeactivatedUser.includes(user.id));
    
    setDeactivatedList(updatedList)
    const ReactiveList = deactivatedList.filter(user => selectedDeactivatedUser.includes(user.id));
    setAlluser(pre => [...pre, ...ReactiveList])
  }

  // Search Client and Clinician 
  let filteredData;
  if(clientType === 1){
    filteredData = allUser.filter((users) => {
      const matchedName = findTreatmentClient.clientName 
        ? users.name.toLocaleLowerCase().includes(findTreatmentClient.clientName.toLocaleLowerCase())
        : true;
  
      const matchedClinician = findTreatmentClient.clinicianName
        ? users.clinicianName.toLocaleLowerCase().includes(findTreatmentClient.clinicianName.toLocaleLowerCase())
        : true;
  
      return matchedName && matchedClinician;
    })
  }

  // Search Client and Clinician in Deactive
  let filterDeactivatedData;
  if (clientType === 2) {
    filterDeactivatedData = deactivatedList.filter((users) => {
      const matchedName = findDeactiveClient.clientName 
        ? users.name.toLocaleLowerCase().includes(findDeactiveClient.clientName.toLocaleLowerCase())
        : true;

      const matchedClinician = findDeactiveClient.clinicianName 
        ? users.clinicianName.toLocaleLowerCase().includes(findDeactiveClient.clinicianName.toLocaleLowerCase())
        : true;

      return matchedName && matchedClinician;
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const randomNum = Math.floor(Math.random() * (200 - 105 + 1)) + 105;
    
    const date = new Date();  
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const setNewUser = {
      id: randomNum,
      name: formData.clientName1,
      clinicianName: formData.clientName1,
      clientType: formData.clientType,
      Lastsession: formattedDate,
      UnsavedNotes: 3213
    }

    console.log(formData);
    

    setAlluser(pre => [...pre, setNewUser])
    setToggleForm(false)

    // Reset Form Data
    setFormData({
      clientType: 'individual',
      clientName1: '',
      clientName2: '',
      pronouns: 'He/Him',
      yearOfBirth: '',
      diagnosis: '',
      highRiskClient: '',
      extraNotes: '',
    })
  }

  // Close Form
  const handleClose = () => {
    setToggleForm(false)
  }

  // Open Form
  const handleOpenForm = () => {
    setToggleForm(true)
  }

  return (
    <div className={styles.container}>
        <div className={styles.mainContent}>
        
          <div className={styles.HelpBox}>
            <Link to="/help"> 
              <div className={styles.questionIconBox}>
                <img src={questionIcon} alt="details" />
              </div>
              <p>Help</p>
            </Link>
          </div>

          <div className={styles.clientBox}>
            <h2>Clients</h2>

             {/* Client Types Buttons  */}
            <div className={styles.ClientTypeBTN}>
              <button
                className={`${clientType === 1 ? styles.isActive : ''}`}
                onClick={() => setClientType(1)}
                >{`In treatment (${allUser.length})`}</button>

              <button
                className={`${clientType === 2 ? styles.isActive : ''}`}
                onClick={() => setClientType(2)}
              >{`Deactivated (${deactivatedList.length})`}</button>
            </div>

            {/* Clietn in Treatment  */}
            { 
                clientType === 1 && (

                <div className={styles.treatmentBox}>

                    {/* search client  */}
                    <div className={styles.FindClients}>
                      <div className={styles.leftSides}>

                        <div className={styles.inputBox}>
                          <label htmlFor="clientname">Client name</label>
                          <input 
                            type="text" 
                            name="clientName"
                            placeholder='Search client'
                            value={findTreatmentClient.clientName}
                            onChange={handleTreatmentChange}
                          />
                        </div>
                        <div className={styles.inputBox}>
                          <label htmlFor="clinicianname">Clinician name</label>
                          <input 
                            type="text" 
                            name="clinicianName"
                            placeholder='Search Clinician'
                            value={findTreatmentClient.clinicianName}
                            onChange={handleTreatmentChange}
                          />
                        </div>

                      </div>

                      <div className={styles.line}></div>

                      <div className={styles.buttonBox}>
                        {/* Deactive */}
                        { selectedUser.length > 0 && <div className={styles.deactiveButton} onClick={handleDeactive}>
                              <div>
                                <img src={deative} alt="deactiveIcon" />
                              </div>

                              <p>Deactive</p>
                          </div>
                        }

                        {/* Add New Client */}
                        <button className={styles.addButton} onClick={handleOpenForm}>
                          + Add new client
                        </button>
                      </div>
                    </div>

                    {/* Client in Treatment Table */}
                    {
                      filteredData.length <= 0 ? 
                      <div className={styles.emptyTableText}>
                        <p>🙁 Oops! No matches found. Please double-check your input.</p>
                      </div>
                      :
                      <div className={styles.clientListBox}>
                        <table className={styles.TabelBox}>
                          <thead>
                            <tr>
                              <th>
                                <input 
                                  type="checkbox" 
                                  checked={isAllSelected}
                                  onChange={(e) => handleSelectAll(e)}
                                />
                              </th>
                              <th>Client name</th>
                              <th>Clinician name</th>
                              <th>Client type</th>
                              <th>Last session</th>
                              <th>Unsaved notes</th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                              filteredData.map((item) => (
                                <tr key={item.id} 
                                  onClick={() => handleSelectOne(item.id)}
                                  className={`${selectedUser.includes(item.id) ? styles.selected : ''}`}
                                >
                                  <td>
                                    <input 
                                      type="checkbox"   
                                      checked={selectedUser.includes(item.id)}
                                    />
                                  </td>
                                  <td>{item.name}</td>
                                  <td>{item.clinicianName}</td>
                                  <td>
                                    <span className={` ${styles.differentType}
                                      ${item.clientType === "individual" && styles.individualType}
                                      ${item.clientType === "couple" && styles.coupleType}
                                      ${item.clientType === "family" && styles.familyType}
                                      ${item.clientType === "child" && styles.childType}
                                      ${item.clientType === "group" && styles.groupType}

                                    `}>{item.clientType}</span>
                                  </td>
                                  <td>{item.Lastsession}</td>
                                  <td>{item.UnsavedNotes}</td>
                                </tr>
                              ))
                            }
                          </tbody>

                        </table>
                      </div>
                    }
                    
                </div>
              )      
            }


            {/* Clietn in Deactivated  */}
            { 
                clientType === 2 && (

                <div className={styles.treatmentBox}>

                  {/* search client  */}
                  <div className={styles.FindClients}>
                    <div className={styles.leftSides}>

                      <div className={styles.inputBox}>
                        <label htmlFor="clientname">Client name</label>
                        <input 
                          type="text" 
                          name="clientName"
                          placeholder='Search client'
                          value={findDeactiveClient.clientName}
                          onChange={handleDeactiveChange}
                        />
                      </div>
                      <div className={styles.inputBox}>
                        <label htmlFor="clinicianname">Clinician name</label>
                        <input 
                          type="text" 
                          name="clinicianName"
                          placeholder='Search Clinician'
                          value={findDeactiveClient.clinicianName}
                          onChange={handleDeactiveChange}
                        />
                      </div>

                    </div>

                    <div className={styles.line}></div>

                    {/* Reactivate */}
                      
                    { selectedDeactivatedUser.length > 0 && <div className={styles.deactiveButton} onClick={handleReactive}>
                          <div>
                            <img src={reactive} alt="reactiveIcon" />
                          </div>

                          <p>Reactivate</p>
                      </div>
                    }
                  </div>

                {/* Client in Treatment Table */}
                {
                  filterDeactivatedData.length <= 0 ? 
                  <div className={styles.emptyTableText}>
                    <p>🙁 Oops! No matches found. Please double-check your input.</p>
                  </div>
                  :
                  <div className={styles.clientListBox}>
                    <table className={styles.TabelBox}>
                      <thead>
                        <tr>
                          <th>
                            <input 
                              type="checkbox" 
                              checked={isAllSelectedDeactivated}
                              onChange={(e) => handleSelectAllDeactivated(e)}
                            />
                          </th>
                          <th>Client name</th>
                          <th>Clinician name</th>
                          <th>Client type</th>
                          <th>Last session</th>
                          <th>Unsaved notes</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          filterDeactivatedData.map((item) => (
                            <tr key={item.id} 
                              onClick={() => handleSelectDeactivatedOne(item.id)}
                              className={`${selectedDeactivatedUser.includes(item.id) ? styles.selected : ''}`}
                            >
                              <td>
                                <input 
                                  type="checkbox"   
                                  checked={selectedDeactivatedUser.includes(item.id)}
                                />
                              </td>
                              <td>{item.name}</td>
                              <td>{item.clinicianName}</td>
                              <td>
                                <span className={` ${styles.differentType}
                                      ${item.clientType === "individual" && styles.individualType}
                                      ${item.clientType === "couple" && styles.coupleType}
                                      ${item.clientType === "family" && styles.familyType}
                                      ${item.clientType === "child" && styles.childType}
                                      ${item.clientType === "group" && styles.groupType}

                                    `}>{item.clientType}</span>
                              </td>
                              <td>{item.Lastsession}</td>
                              <td>{item.UnsavedNotes}</td>
                            </tr>
                          ))
                        }
                      </tbody>

                    </table>
                  </div>
                }

                </div>
              )      
            }

            {/* PopUp Form */}

            { 
              ToggleForm && 

              <div className={styles.formContainer}>
                <div className={styles.formBox}>
                  <div className={styles.closeBox} onClick={handleClose}>
                    <img src={closeIcon} alt="close" />
                  </div>
                  {/* Heading */}
                  <div className={styles.headerForm}>
                    <h3>Add New Client</h3>
                    <p>This client information is essential for generating detailed clients documents</p>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    {/* first fields */}
                    <div className={styles.PrimaryfieldBox}>
                      <label>Client type <span className={styles.start}>*</span></label>
                      <div className={styles.radioFieldBox}>
                        <InputField 
                          type="radio" 
                          id='radio1' 
                          name="clientType" 
                          value="individual"
                          onChange={handleFormChange}
                          defaultChecked
                        />
                        <label htmlFor="radio1">Individual</label>
                        
                        <InputField 
                          type="radio" 
                          id='radio2' 
                          name="clientType" 
                          value="couple"
                          onChange={handleFormChange}
                        />
                        <label htmlFor="radio2">Couple</label>
                      </div>
                    </div>

                    {/* individual Client */}
                    {
                      clientTypeForm === 1 &&

                      <div> 
                        <div className={styles.PrimaryfieldBox}>
                          <label>Name <span className={styles.start}>*</span></label>
                          <InputField 
                            type="text" 
                            name="clientName1"
                            value={formData.clientName1}  
                            onChange={handleFormChange}
                            placeholder="Enter Client Name"
                            required={true}
                          />
                        </div>

                        <div className={styles.PrimaryfieldBox}>
                          <label>Pronouns <span className={styles.start}>*</span></label>
                          <div className={styles.radioFieldBox2}>
                            
                            <InputField 
                              type="radio" 
                              id='radio3' 
                              name="pronouns" 
                              value="He/Him"
                              onChange={handleFormChange}
                              defaultChecked
                              required
                            />
                            <label htmlFor="radio3">He/Him</label>
                            
                            <InputField 
                              type="radio" 
                              id='radio4' 
                              name="pronouns" 
                              value="She/Her"
                              onChange={handleFormChange}
                              required
                            />
                            <label htmlFor="radio4">She/Her</label>

                            <InputField 
                              type="radio" 
                              id='radio5' 
                              name="pronouns" 
                              value="They/Them"
                              onChange={handleFormChange}
                              required
                            />
                            <label htmlFor="radio5">They/Them</label>
                          </div>
                        </div>

                        <div className={styles.PrimaryfieldBox}>
                          <label>Year of birth</label>
                          <InputField 
                            type="number" 
                            name="yearOfBirth"
                            value={formData.yearOfBirth}  
                            onChange={handleFormChange}
                            placeholder="Enter Year of birth"
                            required
                          />
                        </div>

                        <div className={styles.PrimaryfieldBox}>
                          <label>Diagnosis</label>
                        
                          <select name="diagnosis" value={formData.diagnosis} onChange={handleFormChange} required>
                            <option value="" disabled>Select an Diagnosis</option>
                            <option value="Adjustment disorder with anxiety">F43.22 - Adjustment disorder with anxiety</option>
                            <option value="Anxiety">F42.54 - Anxiety</option>
                            <option value="Disorder">F21.276 - Disorder</option>
                          </select>
                        </div>

                        <div className={styles.clientRiskBox}>
                          <InputField 
                            type="checkbox" 
                            id='diagnosis' 
                            name="highRiskClient" 
                            value={ formData.highRiskClient === "" ? "true" : "false"}
                            onChange={handleFormChange}
                          />
                          <label htmlFor='diagnosis'>High risk client</label>
                        </div>

                        <div className={styles.PrimaryfieldBox}>
                          <label>Extra notes</label>
                          <InputField
                            type="text" 
                            name="extraNotes"
                            value={formData.extraNotes}  
                            onChange={handleFormChange}
                            placeholder='Extra information about your client'
                            required
                          />
                        </div>  

                        <div className={styles.addClientFormButton}>
                          <button type='submit'>Add Client</button>
                        </div>
                      </div>
                    }

                    {
                      clientTypeForm === 2 &&

                      <div> 
                        <div className={styles.PrimaryfieldBox}>
                          <label>Name 1 <span className={styles.start}>*</span></label>
                          <InputField 
                            type="text" 
                            name="clientName1"
                            value={formData.clientName1}  
                            onChange={handleFormChange}
                            placeholder="Enter Client Name 1"
                            required
                          />
                        </div>
                        <div className={styles.PrimaryfieldBox}>
                          <label>Name 2 <span className={styles.start}>*</span></label>
                          <InputField 
                            type="text" 
                            name="clientName2"
                            value={formData.clientName2}  
                            onChange={handleFormChange}
                            placeholder="Enter Client Name 2"
                            required
                          />
                        </div>

                        <div className={styles.PrimaryfieldBox}>
                          <label>Diagnosis</label>
                        
                          <select name="diagnosis" value={formData.diagnosis} onChange={handleFormChange} required>
                            <option value="" disabled>Select an Diagnosis</option>
                            <option value="Adjustment disorder with anxiety">F43.22 - Adjustment disorder with anxiety</option>
                            <option value="Anxiety">F42.54 - Anxiety</option>
                            <option value="Disorder">F21.276 - Disorder</option>
                          </select>
                        </div>

                        <div className={styles.clientRiskBox}>
                            <InputField 
                              type="checkbox" 
                              id='diagnosis' 
                              name="highRiskClient" 
                              value={ formData.highRiskClient === "" ? "true" : "false"}
                              onChange={handleFormChange}
                            />
                          <label htmlFor='diagnosis'>High risk client</label>
                        </div>

                        <div className={styles.PrimaryfieldBox}>
                          <label>Extra notes</label>
                          <InputField 
                            type="text" 
                            name="extraNotes"
                            value={formData.extraNotes}  
                            onChange={handleFormChange}
                            placeholder='Extra information about your client'
                            required
                          />
                        </div>  

                        <div className={styles.addClientFormButton}>
                          <button type='submit'>Add Client</button>
                        </div>
                      </div>
                    }
                  </form>
                </div>
              </div>
            }
          </div>
        </div>
    </div>
  )
}

export default Client