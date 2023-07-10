# Tutorial de Aplicación del Clima en React

Este es un tutorial para crear una aplicación de clima utilizando React. El código proporcionado es un componente de React llamado `WeatherApp`, que es responsable de mostrar la información del clima para una ciudad específica.

## Requisitos

Antes de comenzar, asegúrate de tener instalado Node.js y NPM en tu sistema. Además, necesitarás una clave de API de OpenWeatherMap para acceder a los datos del clima. Puedes obtener una clave de API registrándote en [OpenWeatherMap](https://openweathermap.org/) y creando una cuenta gratuita.

## Paso 1: Configuración inicial

Asegúrate de tener un proyecto de React configurado y los archivos necesarios en tu repositorio. También necesitarás importar los siguientes módulos y archivos:
```
    import { useState, useEffect } from 'react';
    import './styles/weatherStyles.css';
```

El código anterior importa los módulos `useState` y `useEffect` de React, así como el archivo CSS para los estilos de la aplicación.

## Paso 2: Inicialización del estado

Dentro del componente `WeatherApp`, se definen dos estados utilizando el hook `useState`:

```
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
```

-   `weatherData` es el estado que almacenará los datos del clima obtenidos de la API. Inicialmente se establece como `null`.
-   `city` es el estado que almacenará el nombre de la ciudad ingresado por el usuario. Inicialmente se establece como una cadena vacía.

## Paso 3: Configuración de variables y constantes

A continuación, se definen algunas variables y constantes necesarias para la aplicación:

```
    let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    let api_key = 'YOUR_API_KEY';
    let difKelvin = 273.15;
```

-   `urlBase` es la URL base de la API de OpenWeatherMap que se utilizará para realizar la solicitud de datos del clima.
-   `api_key` es tu clave de API de OpenWeatherMap. Asegúrate de reemplazarla con tu propia clave.
-   `difKelvin` es una constante utilizada para convertir la temperatura de Kelvin a Celsius.

## Paso 4: Obtención de datos del clima

El siguiente bloque de código define la función `fetchWeatherData`, que se utiliza para obtener los datos del clima de la API de OpenWeatherMap:

```
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${api_key}`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };
```

-   La función `fetchWeatherData` realiza una solicitud HTTP GET a la API de OpenWeatherMap utilizando la URL construida con la ciudad ingresada por el usuario y la clave de API.
-   Luego, se convierte la respuesta en formato JSON utilizando `response.json()` y se actualiza el estado `weatherData` con los datos obtenidos.

## Paso 5: Manejo de eventos

Se definen dos funciones para manejar los eventos en la aplicación:

### Cambio de ciudad

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

La función `handleCityChange` se utiliza para actualizar el estado `city` con el valor ingresado por el usuario en el campo de texto.

### Envío del formulario

```
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };
```

La función `handleSubmit` se llama cuando se envía el formulario. Previene el comportamiento de envío predeterminado del navegador utilizando `e.preventDefault()` y luego llama a la función `fetchWeatherData` para obtener los datos del clima de la ciudad ingresada por el usuario.

## Paso 6: Renderizado de la aplicación

El último bloque de código dentro del componente `WeatherApp` se encarga de renderizar la interfaz de usuario de la aplicación:

```
    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={city} onChange={handleCityChange} placeholder="Ingresa una ciudad" />
                <button type="submit">Buscar</button>
            </form>
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperatura: {parseInt(weatherData.main?.temp - difKelvin)}°C</p>
                    <p>Condición: {weatherData.weather[0]?.description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
                </div>
            )}
        </div>
    );

```

-   Se utiliza una estructura de elementos HTML para mostrar la interfaz de usuario de la aplicación.
-   El título principal de la aplicación se muestra con `<h1>`.
-   Se crea un formulario con un campo de texto para ingresar la ciudad y un botón para enviar el formulario. El evento `onSubmit` está vinculado a la función `handleSubmit`.
-   Si existen datos de clima disponibles en `weatherData`, se muestran en la interfaz de usuario utilizando elementos HTML adicionales. La temperatura se muestra en grados Celsius después de convertir la temperatura en Kelvin a través de la resta `weatherData.main?.temp - difKelvin`. La descripción del clima se muestra utilizando `weatherData.weather[0]?.description`. Además, se muestra un ícono del clima utilizando la URL de la imagen proporcionada por la API de OpenWeatherMap.
