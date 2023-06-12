import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addContact,
  deleteContact,
  findContact,
  findContacts,
  resetError,
} from "../../Api/Contact";

export const ContactFields = [
  { type: "text", name: "fullname", placeholder: "FullName" },
  { type: "email", name: "email", placeholder: "Email" },
  { type: "text", name: "subject", placeholder: "Subject" },
];

export const useDispatchContacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.contact);
  const handleAddContact = (values) => dispatch(addContact(values));
  const handleDeleteContact = (values) => dispatch(deleteContact(values));
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Contact", { state: { statusCode: 500 } });
    }
  }, [state]);

  return { handleAddContact, handleDeleteContact };
};

export const useFindContacts = (key, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.contact);

  useEffect(() => {
    if (key === "all-contacts") {
      dispatch(findContacts());
    } else if (key === "single-contact") {
      dispatch(findContact(values));
    } else {
      return;
    }
  }, [key]);

  useEffect(() => {
    if (state.error) {
      navigate("/Error-Add-Contact", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return { state };
};
