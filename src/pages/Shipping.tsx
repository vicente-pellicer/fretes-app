import { ItemAdd } from "../components/ItemAdd";
import { ItemShipping } from "../components/ItemShipping";
import { FormShipping } from "../components/FormShipping";
import { getAllShipping } from "../services/api";
import { Grid, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function Shipping() {
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm
  } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [shippings, setShippings] = useState([]);
  const [id, setId] = useState("");
  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [cargo, setCargo] = useState("");
  const [description, setDescription] = useState("");

  function openAddForm() {
    setId("");
    setDriver("");
    setVehicle("");
    setCargo("");
    setDescription("");
    onOpenForm();
  }

  async function getShippings() {
    let data = await getAllShipping();
    setShippings(data.all);
  }

  useEffect(() => {
    getShippings();
  }, [shippings]);

  return (
    <>
      <FormShipping
        isOpen={isOpenForm}
        onClose={onCloseForm}
        isEdit={isEdit}
        _id={id}
        _driver={driver}
        _vehicle={vehicle}
        _cargo={cargo}
        _description={description}
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
        {shippings.map((shipping) => (
          <ItemShipping
            key={shipping._id}
            shippingId={shipping._id}
            driverId={shipping.driver._id}
            driver={shipping.driver.name}
            vehicleId={shipping.vehicle._id}
            vehicle={shipping.vehicle.name}
            cargoId={shipping.cargo[0]._id}
            cargo={shipping.cargo[0].name}
            description={shipping.description}
          />
        ))}
      </Grid>
    </>
  );
}
