import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import myDate from "../myDate"; //date
import axios from "axios";
import { useTranslation } from "react-i18next"; //i18next

export default function Home() {
  const [location, setLocation] = useState<string>("Ivano-Frankivsk");
  const [data, setData] = useState<any>({});
  const [destOffset, setDestOffset] = useState<number>(7200);
  const [city, setCity] = useState<string>("");
  const [temp, setTemp] = useState<any>("");
  const [desc, setDesc] = useState<string>("");
  const [pressure, setPressure] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const { t } = useTranslation(); //i18n

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4f625b6c6693cf0b7d4d66e65cd65a7d`;

  const [date, setDate] = useState(
    myDate(destOffset / 3600).cityDate.slice(0, 17)
  );
  const searchLocation = (event: any) => {
    axios.get(url).then((response) => {
      setData(response.data);
      setDestOffset(response.data.timezone);
      setCity(response.data.name);
      setDesc(response.data.weather[0].description);
      setPressure(response.data.main.pressure);
      setSpeed(Math.round(response.data.wind.speed));
      if (response.data.main.temp >= -0.5 && response.data.main.temp <= 0.49) {
        setTemp(0);
      } else if (response.data.main.temp > 0.5) {
        setTemp("+" + Math.round(response.data.main.temp));
      } else {
        setTemp(Math.round(response.data.main.temp));
      }
    });
    setLocation("");
  };

  useEffect(() => {
    setDate(myDate(destOffset / 3600).cityDate.slice(0, 17));
  }, [destOffset]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 134px)",
        backgroundColor: "rgb(255, 255, 125)",
        paddingBottom: "30px",
        color:"darkblue"
      }}
    >
      <Box sx={{padding:"20px", textAlign:"center"}}>
        <Typography variant="h4">{t("titleHome")}</Typography>
      </Box>
      <Box sx={{ display: "flex", marginLeft: "20px" }}>
        <TextField
          id="outlined-search"
          size="small"
          type="search"
          value={location}
          onChange={(event: any) => setLocation(event.target.value)}
          sx={{
            width: "180px",
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "grey",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
          }}
        />
        <Button
          sx={{
            marginLeft: "10px",
            backgroundColor: "rgb(14,23,36)",
            "&:hover": {
              backgroundColor: "rgba(14, 23, 36, 0.77)",
            },
            color: "white",
            padding: "8px 25px",
          }}
          onClick={searchLocation}
        >
          {t("search")}
        </Button>
      </Box>

      {data.main ? (
        <Box sx={{ margin: "20px" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}>
            <Typography sx={{ marginRight: "15px", minWidth:"130px" }}>{city}</Typography>
            <Typography>{date}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography sx={{ marginRight: "15px", minWidth:"130px" }}>{t("temp")}</Typography>
            <Typography>{temp}&deg;C</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography sx={{ marginRight: "15px", minWidth:"130px" }}>{t("pressure")}</Typography>
            <Typography>{pressure}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography sx={{ marginRight: "15px", minWidth:"130px" }}>{t("speed")}</Typography>
            <Typography>{speed}m/s</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography sx={{ marginRight: "15px", minWidth:"130px" }}>{t("desc")}</Typography>
            <Typography>{desc}</Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
