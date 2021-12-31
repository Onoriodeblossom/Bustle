import React, { Component } from 'react'
const urlEndpoint = `http://bustle.ticketplanet.ng`
export const GetCategoryById = (id, userid) => {
    fetch(`${urlEndpoint}/${id}/${userid}`, {
        method: 'Get',
        headers: {
            //Header Defination
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const AddEditDiscount = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateDiscount`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const UpdateSalesStatus = (dataToSend) => {
    return fetch(`${urlEndpoint}/UpdateSalesStatus`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const EditCredit = (dataToSend) => {
    return fetch(`${urlEndpoint}/UpdateCreditSales`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const EditShoppingList = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrEditShoppingList`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const AddShoppingList = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateShoppingList`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const AddBankDetails = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateBankAccount`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const EditCategory = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateCategory`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const AddPurchase = (dataToSend) => {
    return fetch(`http://bustle.ticketplanet.ng/CreateOrEditPurchase`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const GenerateInvoice = (dataToSend) => {
    console.log('string ', dataToSend)
    return fetch(`http://bustle.ticketplanet.ng/GenerateInvoice`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const AddSales = (dataToSend) => {
    console.log('string ', dataToSend)
    return fetch(`http://bustle.ticketplanet.ng/CreateOrUpdateSales`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const AddCategory = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateCategory`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const AddExpenseType = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateExpenseType`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const EditExpenseType = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateExpenseType`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const AddExpense = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateExpense`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const EditExpense = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateExpense`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const AddProduct = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateProducts`, {
        method: 'post',
        body: dataToSend,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const EditProduct = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateProducts`, {
        method: 'post',
        body: dataToSend,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const EditProfile = (dataToSend) => {
    return fetch(`${urlEndpoint}/EditUserProfile`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const AddProductVariation = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateProductVariation`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const DeleteProductVariation = (dataToSend) => {
    return fetch(`${urlEndpoint}/DeleteProductVariant`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const DeleteBankDetails = (dataToSend) => {
    return fetch(`${urlEndpoint}/DeleteBankAccount`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const DeleteExpense = (dataToSend) => {
    return fetch(`${urlEndpoint}/DeleteExpense`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const DeleteExpenseType = (dataToSend) => {
    return fetch(`${urlEndpoint}/DeleteExpenseType`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const DeleteProduct = (dataToSend) => {
    return fetch(`${urlEndpoint}/DeleteProduct`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}
export const DeletePurchase = (dataToSend) => {
    return fetch(`${urlEndpoint}/DeletePurchase`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const DeleteCategory = (dataToSend) => {
    return fetch(`${urlEndpoint}/DeleteCategory`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const EditProductVariation = (dataToSend) => {
    return fetch(`${urlEndpoint}/CreateOrUpdateProductVariation`, {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const GetAllProductVariationById = (ProductVariationId, userid) => {
    fetch(`${urlEndpoint}/GetAllProductVariationById/${ProductVariationId}/${userid}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            return responseJson;
        }).catch(error => {
            console.error(error);
        });
}

export const fetchCategories = url => {
    return fetch(url)
        .then(response => response)
        .then(response => response.json());
};