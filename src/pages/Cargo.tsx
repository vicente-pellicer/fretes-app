import { ItemAdd } from "../components/ItemAdd";
import { ItemCargo } from "../components/ItemCargo";
import { FormCargo } from "../components/FormCargo";
import { getAllCargo } from "../services/api";
import { Grid, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function Cargo() {
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm
  } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [cargos, setCargos] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [shipping, setShipping] = useState("");
  const [cep, setCep] = useState("");

  function openAddForm() {
    setId("");
    setName("");
    setDesc("");
    setShipping("");
    setCep("");
    onOpenForm();
  }

  async function getCargos() {
    let data = await getAllCargo();
    setCargos(data.all);
    console.log(cargos);
  }

  useEffect(() => {
    getCargos();
  }, [cargos]);

  return (
    <>
      <FormCargo
        isOpen={isOpenForm}
        onClose={onCloseForm}
        isEdit={isEdit}
        _id={id}
        _name={name}
        _desc={desc}
        _shipping={shipping}
        _cep={cep}
      />
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={4}
        mx={24}
        my={8}
        alignSelf="center"
        fontFamily="mono"
      >
        <a
          href="#"
          onClick={() => {
            setIsEdit(false);
            openAddForm();
          }}
        >
          <ItemAdd />
        </a>
        {cargos.map((cargo) => (
          <ItemCargo
            key={cargo._id}
            cargoId={cargo._id}
            name={cargo.name}
            description={cargo.description}
            shipping={cargo.shipping._id}
            cep={cargo.recipientCep}
          />
        ))}
      </Grid>
    </>
  );
}
