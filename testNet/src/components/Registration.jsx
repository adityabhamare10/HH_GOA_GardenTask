import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Web3 from "web3";
import { Toaster, toast } from "react-hot-toast";
// import AceHacks from "./artifacts/contracts/registration.sol/AceHacks.json";
import AceHacks from '../../artifacts/contracts/registration.sol/AceHacks.json';
const FormikForm = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    contact: Yup.string()
      .required("Contact Information is required")
      .matches(/^[0-9]+$/, "Contact Information must be a number"),
    aadharCard: Yup.string().required("Aadhar Card is required"),
    propertyAddress: Yup.string().required("Property Address is required"),
    propertyDescription: Yup.string().required(
      "Property Description is required"
    ),
    deedOrTitle: Yup.string().required("Deed or Title is required"),
    landSurvey: Yup.string().required("Land Survey is required"),
    additionalDocumentation: Yup.string().required(
      "Additional Documentation is required"
    ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [aadhar, setAadhar] = useState();
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [ULPIN, setUlpin] = useState();
  const handleSubmitChain = async (e) => {
        console.log("Clicked");
        e.preventDefault();
    
        // Connect to Web3 provider
        if (window.ethereum) {
          try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
          } catch (error) {
            console.error("User denied account access");
            return;
          }
          const web3 = new Web3(window.ethereum);
    
          // Load contract ABI and address
          const contract = new web3.eth.Contract(
            AceHacks.abi,
            "0xfB147dd5453cD478dE46b27E391f85aA3e669879" // Replace with your deployed contract address
          );
    
          // Prepare transaction parameters
          // const { name, college, age } = formData;
    
          // Send transaction to smart contract
          try {
            await contract.methods
              .addToRegister(ULPIN, name, contact, aadhar, desc, address)
              .send({
                from: (await web3.eth.getAccounts())[0],
              });
              toast.success('Successfully toasted!')
          } catch (error) {
            console.error("Error uploading data:", error);
            toast.error('Upload Failed');
          }
        } else {
          console.error("Web3 provider not detected");
          alert(
            "Please install MetaMask or another Web3 provider to interact with the contract."
          );
        }
      };
  return (
    <div>
    <div><Toaster/></div>
      <h1 className="orange_gradient text-5xl font-semibold text-center mt-14 pb-4">
        Registration
      </h1>
      <h2 className="desc text-center mt-4 text-xl">
        A simple registration process to get you started with your land
        ownership.
      </h2>
      <Formik
        initialValues={{
          fullName: "",
          contact: "",
          aadharCard: "",
          propertyAddress: "",
          propertyDescription: "",
          deedOrTitle: "",
          landSurvey: "",
          additionalDocumentation: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-8">
            <div className="flex flex-col mb-4">
              <label htmlFor="fullName">Full Name</label>
              <Field
                className="h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="fullName"
                type="text"
                id="fullName"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <ErrorMessage name="fullName" component="div" />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="contact">Contact Information </label>
              <Field
                className="h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="contact"
                type="number"
                id="contact"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <ErrorMessage name="contact" component="div" />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="aadharCard">Aadhar Card</label>
              <Field
                className="h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="aadharCard"
                type="number"
                id="aadharCard"
                required
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
              />
              <ErrorMessage name="aadharCard" component="div" />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="propertyAddress">Property Address</label>
              <Field
                className="h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="propertyAddress"
                type="text"
                id="propertyAddress"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <ErrorMessage name="propertyAddress" component="div" />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="propertyDescription">Property Description</label>
              <Field
                className="h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="propertyDescription"
                type="text"
                id="propertyDescription"
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <ErrorMessage
                name="propertyDescription"
                component="div"
                className="text-gray-300"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="deedOrTitle">Deed or Title</label>
              <Field
                className="h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="deedOrTitle"
                type="text"
                id="deedOrTitle"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <ErrorMessage name="deedOrTitle" component="div" />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="deedOrTitle">ULPIN</label>
              <Field
                className="h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="ULPIN"
                type="text"
                id="ULPIN"
                required
                value={ULPIN}
                onChange={(e) => setUlpin(e.target.value)}
              />
              <ErrorMessage
                name="ULPIN"
                component="div"
                className="text-gray-300"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleSubmitChain}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
