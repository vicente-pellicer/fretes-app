import { ItemAdd } from "../components/ItemAdd";
import { ItemDriver } from "../components/ItemDriver";
import { FormDriver } from "../components/FormDriver";
import { getAllDriver } from "../services/api";
import { Grid, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function Driver() {
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm
  } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");

  function openAddForm() {
    setId("");
    setName("");
    setBirthdate("");
    setCpf("");
    onOpenForm();
  }

  async function getDrivers() {
    let data = await getAllDriver();
    setDrivers(data.all);
    console.log(drivers);
  }

  useEffect(() => {
    getDrivers();
  }, [drivers]);

  return (
    <>
      <FormDriver
        isOpen={isOpenForm}
        onClose={onCloseForm}
        isEdit={isEdit}
        _id={id}
        _name={name}
        _cpf={cpf}
        _birthdate={birthdate}
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
        {drivers.map((driver) => (
          <ItemDriver
            key={driver._id}
            driverId={driver._id}
            name={driver.name}
            cpf={driver.cpf}
            birthdate={driver.birthdate}
          />
        ))}
      </Grid>
    </>
  );
}
