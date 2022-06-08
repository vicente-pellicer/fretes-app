import { ItemAdd } from "../components/ItemAdd";
import { ItemVehicle } from "../components/ItemVehicle";
import { FormVehicle } from "../components/FormVehicle";
import { getAllVehicle } from "../services/api";
import { Grid, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function Vehicle() {
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm
  } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState(null);

  function openAddForm() {
    setId("");
    setName("");
    setDescription("");
    setLicensePlate("");
    setManufacturingYear(null);
    onOpenForm();
  }

  async function getVehicles() {
    let data = await getAllVehicle();
    setVehicles(data.all);
  }

  useEffect(() => {
    getVehicles();
  }, [vehicles]);

  return (
    <>
      <FormVehicle
        isOpen={isOpenForm}
        onClose={onCloseForm}
        isEdit={isEdit}
        _id={id}
        _name={name}
        _description={description}
        _licensePlate={licensePlate}
        _manufacturingYear={manufacturingYear}
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
        {vehicles.map((vehicle) => (
          <ItemVehicle
            key={vehicle._id}
            vehicleId={vehicle._id}
            name={vehicle.name}
            description={vehicle.description}
            licensePlate={vehicle.licensePlate}
            manufacturingYear={vehicle.manufacturingYear}
          />
        ))}
      </Grid>
    </>
  );
}
