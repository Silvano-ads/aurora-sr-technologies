/* =====================================================
   AURORA SR TECHNOLOGIES
   SCRIPT PRINCIPAL
===================================================== */


/* =====================================================
   MENU MOBILE
===================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("open");

        document.body.classList.toggle("menu-open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =====================================================
   ANO AUTOMÁTICO DO RODAPÉ
===================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =====================================================
   ANIMAÇÃO AO ENTRAR NA TELA
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* =====================================================
   MENU ATIVO CONFORME A SEÇÃO
===================================================== */

const sections = document.querySelectorAll(
    "main section[id]"
);

const sectionLinks = document.querySelectorAll(
    ".main-nav a:not(.nav-cta)"
);

if (
    "IntersectionObserver" in window &&
    sections.length &&
    sectionLinks.length
) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const currentId =
                    entry.target.getAttribute("id");


                sectionLinks.forEach((link) => {

                    link.classList.remove("active");

                    const linkTarget =
                        link.getAttribute("href");


                    if (linkTarget === `#${currentId}`) {

                        link.classList.add("active");

                    }

                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }
    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


/* =====================================================
   SCROLL SUAVE
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(targetId);


        if (!target) {

            return;

        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   FECHAMENTO DO MENU AO REDIMENSIONAR
===================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 760) {

        if (mainNav) {

            mainNav.classList.remove("open");

        }


        document.body.classList.remove("menu-open");


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});


/* =====================================================
   PREVENÇÃO DE CLIQUE EM LINKS VAZIOS
===================================================== */

document.querySelectorAll('a[href="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

    });

});


/* =====================================================
   FORMULÁRIO DE ORÇAMENTO
   WEB3FORMS
===================================================== */

const quoteForm =
    document.querySelector(".quote-form");


if (quoteForm) {

    quoteForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const submitButton =
            quoteForm.querySelector('button[type="submit"]');


        const originalButtonText =
            submitButton.innerHTML;


        submitButton.disabled = true;

        submitButton.innerHTML =
            "Enviando solicitação...";


        try {

            const formData =
                new FormData(quoteForm);


            const response =
                await fetch(
                    quoteForm.action,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Accept: "application/json"
                        }
                    }
                );


            const result =
                await response.json();


            if (response.ok && result.success) {

                quoteForm.reset();


                submitButton.innerHTML =
                    "Solicitação enviada ✓";


                const successMessage =
                    document.createElement("div");


                successMessage.className =
                    "form-success";


                successMessage.innerHTML = `
                    <strong>Solicitação enviada com sucesso!</strong>
                    <p>
                        Recebemos suas informações.
                        Em breve entraremos em contato.
                    </p>
                `;


                submitButton.insertAdjacentElement("afterend", successMessage);


                setTimeout(() => {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalButtonText;

                }, 5000);


            } else {

                throw new Error(
                    result.message ||
                    "Não foi possível enviar a solicitação."
                );

            }


        } catch (error) {

            console.error(
                "Erro ao enviar formulário:",
                error
            );


            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButtonText;


            const errorMessage =
                document.createElement("div");


            errorMessage.className =
                "form-error";


            errorMessage.innerHTML = `
                <strong>Não foi possível enviar.</strong>
                <p>
                    Ocorreu um problema durante o envio.
                    Verifique sua conexão e tente novamente.
                </p>
            `;


            submitButton.insertAdjacentElement("afterend", errorMessage);

        }

    });

}


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "AURORA SR TECHNOLOGIES — site carregado com sucesso."
);