import axios from "axios";

const apiService = axios.create({
  baseURL: "https://fretes-api.herokuapp.com"
});

///////////
// CARGO //
///////////

export async function getAllCargo() {
  try {
    const response = await apiService.get("/Cargo/all");
    const allCargo = response.data;
    return allCargo;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function postCargo(newCargo) {
  try {
    const response = await apiService.post("/Cargo/register", newCargo);
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function putCargo(cargoId, upCargo) {
  try {
    const response = await apiService.put(`/Cargo/update/${cargoId}`, upCargo);
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function delCargo(cargoId) {
  try {
    const response = await apiService.delete(`/Cargo/delete/${cargoId}`);
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

////////////
// DRIVER //
////////////

export async function getAllDriver() {
  try {
    const response = await apiService.get("/Driver/all");
    const allDriver = response.data;
    return allDriver;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function postDriver(newDriver) {
  try {
    const response = await apiService.post("/Driver/register", newDriver);
    console.log(response);
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function putDriver(driverId, upDriver) {
  try {
    const response = await apiService.put(
      `/Driver/update/${driverId}`,
      upDriver
    );
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function delDriver(driverId) {
  try {
    const response = await apiService.delete(`/Driver/delete/${driverId}`);
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

//////////////
// SHIPPING //
//////////////

export async function getAllShipping() {
  try {
    const response = await apiService.get("/Shipping/all");
    const allShipping = response.data;
    return allShipping;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function postShipping(newShipping) {
  try {
    const response = await apiService.post("/Shipping/register", newShipping);
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function putShipping(shippingId, upShipping) {
  try {
    const response = await apiService.put(
      `/Shipping/update/${shippingId}`,
      upShipping
    );
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function delShipping(shippingId) {
  try {
    const response = await apiService.delete(`/Shipping/delete/${shippingId}`);
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

/////////////
// VEHICLE //
/////////////

export async function getAllVehicle() {
  try {
    const response = await apiService.get("/Vehicle/all");
    const allVehicle = response.data;
    return allVehicle;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function postVehicle(newVehicle) {
  try {
    const response = await apiService.post("/Vehicle/register", newVehicle);
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function putVehicle(vehicleId, upVehicle) {
  try {
    const response = await apiService.put(
      `/Vehicle/update/${vehicleId}`,
      upVehicle
    );
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}

export async function delVehicle(vehicleId) {
  try {
    const response = await apiService.delete(`/Vehicle/delete/${vehicleId}`);
    return response;
  } catch (err) {
    if (err) {
      return err;
    }
  }
}
