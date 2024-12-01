document.addEventListener("DOMContentLoaded", () => {

    const secProduct = document.getElementById("secProduct")
    const cartBtn = document.getElementById("cartBtn")
    const close = document.getElementById("main")
    const cartSec = document.getElementById("cartSec")
    let cartCont = document.getElementById("cartCont")
    const backToProdLogo = document.getElementById("backToProdLogo")
    const itogPrice1 = document.getElementById("itogPrice1")
    const itogPrice2 = document.getElementById("itogPrice2")
    const itogPriceHead = document.getElementById("itogPriceHead")
    const prodIndex = document.getElementById("prodIndex")
    const prodIndex2 = document.getElementById("prodIndex2")
    const saleBtn = document.getElementById("saleBtn")
    const cart = []

    const noneHead = document.querySelector(".noneHead")

    const mensCheck = document.getElementById("mensCheck")
    const jeweleryCheck = document.getElementById("jeweleryCheck")
    const electronicsCheck = document.getElementById("electronicsCheck")
    const womenCheck = document.getElementById("womenCheck")
    const filterNone = document.getElementById("filterNone")

    const filtBtn = document.getElementById("filtBtn")

    const adapCartHead = document.querySelector(".adapCartHead")
    const logoMainAdap = document.getElementById("logoMainAdap")


    let minInp = document.getElementById("minInp")
    let maxInp = document.getElementById("maxInp")


    const mainAdapHead = document.querySelector(".mainAdapHead")
    const headCartAdap = document.querySelector(".headCartAdap")
    const mainAdapCArtHead = document.getElementById("mainAdapCArtHead")

    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => renderProd(data))



    function renderProd(data){
        console.log(data);
        
        secProduct.innerHTML = ""

        data.forEach(product => {
            let prodDiv = document.createElement("div")
            prodDiv.classList.add("prodCont")


            let titleWords = product.title.split(" ")
            if (titleWords.length > 6) {
                titleWords = titleWords.slice(0, 6)
            }
            const shortTitle = titleWords.join(" ")


            prodDiv.innerHTML = `
                                <img class="imgProd" src="${product.image}" alt="">
                                <h1 class="titleCont">${shortTitle}</h1>
                                <div class="priceCont">
                                    <span class="price">${product.price}$</span>
                                    <span class="priceDel"><del> ${product.price}$</del></span>
                                </div>
                                <div class="ratingCont">
                                    <span class="rateCont">Рейтинг: ${product.rating.rate}</span>
                                    <span class="rateCont">Продано: ${product.rating.count}</span>
                                </div>
                                <button data-id="${product.id}" class= "addBtn">Add To Cart</button>
            `
            secProduct.appendChild(prodDiv)

            const addBtn = prodDiv.querySelector(".addBtn")

            addBtn.addEventListener("click", () => {
                let idProd = addBtn.dataset.id
                addToCart(idProd)
            })
        });

        

            
    }



    cartBtn.addEventListener("click", () => {
        close.style.display = "none"
        cartSec.style.display = "block"
        noneHead.style.display = "flex"
        updateTotalQuantity()
    })

    backToProdLogo.addEventListener("click", () => {
        close.style.display = "block"
        cartSec.style.display = "none"
        noneHead.style.display = "none"

    })


    async function addToCart(idProd) {
        const productInCart = cart.find(product => product.id === idProd)
        
        if(productInCart){
            productInCart.quantity += 1
        }else{
            const response = await fetch(`https://fakestoreapi.com/products/${idProd}`)
            const data = await response.json()
            data.quantity = 1
            cart.push(data)

        }
        
        renderCart(cart)
        updateTotalQuantity()
    }

    function renderCart(cart){
        cartCont.innerHTML = ""
        let total = 0

        cart.forEach(product => {
            let prodDiv = document.createElement('div')
            prodDiv.classList.add("prodContCart")

            let titleWords = product.title.split(" ")
            if (titleWords.length > 6) {
                titleWords = titleWords.slice(0, 6)
            }
            const shortTitle = titleWords.join(" ")

            prodDiv.innerHTML = `
                                <div class="imagesCont">
                                    <img class="glavImgProd" src="${product.image}" alt="">
                                    <div class="infoAdap">
                                        <div class="adapInfoCont">
                                            <div class="adapPriceCont">
                                                <h1 class="adapPriceSell">${product.price}USD</h1>
                                                <p class="adapPriceMore">${product.price}USD</p>
                                            </div>
                                            <p class="adapTitle">${shortTitle}</p>
                                            <div class="adapInfoProd">
                                                <h3>Рейтинг: <span>${product.rating.rate}</span></h3>
                                                <p>Продано: <span>${product.rating.count}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="palka"></div>
                                <div class="InfoAndPlus">
                                    <h1 class="titleCartProd">${shortTitle}</h1>
                                    <div class="countCont">
                                        <div class="countInfo">
                                            <img class="plusImg" data-id="${product.id}" class="imgProdPusMin" src="${"/images/плюс.png"}" alt=""> 
                                            <p class="numCounter">${product.quantity}</p>
                                            <img class="minusImg" data-id="${product.id}" class="imgProdPusMin" src="${"/images/минус.png"}" alt="">
                                        </div>
                                        <div data-id="${product.id}"><button class="deltag">Удалить</button></div>
                                    </div>        
                                </div>
                               <p class="priceItogCont"><span class="priceItogCart">${product.price}</span>USD</p>
            `

            cartCont.appendChild(prodDiv)
            total += product.price * product.quantity

            const plusImg = prodDiv.querySelector(".plusImg")
            const minusImg = prodDiv.querySelector(".minusImg")
            const numCounterElement = prodDiv.querySelector(".numCounter")
            const deltag = prodDiv.querySelector(".deltag")


            plusImg.addEventListener("click", () => {
                product.quantity += 1
                renderCart(cart)
                updateTotalQuantity()
            })

            minusImg.addEventListener("click", () => {
                if(product.quantity > 1){
                    product.quantity -= 1
                    renderCart(cart)
                    updateTotalQuantity()
                }
            })

            deltag.addEventListener("click", () => {
                const productIndex = cart.findIndex(item => item.id === product.id);
                if (productIndex !== -1) {
                    cart.splice(productIndex, 1)
                    renderCart(cart)
                    updateTotalQuantity()
                }
            });
        });

        itogPrice1.innerHTML = `${total.toFixed(2)} USD`;
        itogPrice2.innerHTML = `${total.toFixed(2)} USD`;
        itogPriceHead.innerHTML = `${total.toFixed(2)} USD`;
    }

    function updateTotalQuantity() {
        let totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
        prodIndex.innerHTML = `${totalQuantity}`;
        prodIndex2.innerHTML = `${totalQuantity}`;
    }


    saleBtn.addEventListener("click", (event) => {
        event.preventDefault()
        alert("Спасибо за заказ!");
        
    })

    filtBtn.addEventListener("click", () => {
        const selectCategory = []
    
        if(mensCheck.checked){
            selectCategory.push("men's clothing")
        }
    
        if(jeweleryCheck.checked){
            selectCategory.push("jewelery")
        }
    
        if(electronicsCheck.checked){
            selectCategory.push("electronics")
        }
    
        if(womenCheck.checked){
            selectCategory.push("women's clothing")
        }
    
        const minPrice = parseFloat(minInp.value) || 0
        const maxPrice = parseFloat(maxInp.value) || Infinity
    
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => {
                let filteredProducts = data
                
                if(selectCategory.length > 0){
                    filteredProducts = filteredProducts.filter(product => 
                        selectCategory.includes(product.category)
                    );
                }
                
                filteredProducts = filteredProducts.filter(product => 
                    product.price >= minPrice && product.price <= maxPrice
                );
                
                renderProd(filteredProducts)
                
                
            });
    });
    

    
    filterNone.addEventListener("click", () => {
        fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => renderProd(data))
    })

    adapCartHead.addEventListener("click", () => {
        close.style.display = "none"
        cartSec.style.display = "block"
        mainAdapHead.style.display = "none"
        headCartAdap.style.display = "flex"
    })

    logoMainAdap.addEventListener("click", () => {
        close.style.display = "block"
        cartSec.style.display = "none"
    })

    mainAdapCArtHead.addEventListener("click", () => {
        close.style.display = "block"
        cartSec.style.display = "none"
        mainAdapHead.style.display = "flex"
        headCartAdap.style.display = "none"
    })
      
})


// под img 

