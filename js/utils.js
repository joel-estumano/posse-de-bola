function displayTime(time) {
    return time.toLocaleTimeString("pt-BR", {
        hour: "2-digit", //Exibirá horas.
        minute: "2-digit", //Exibirá minutos.
        second: "2-digit", //Exibirá segundos.
    });
}
