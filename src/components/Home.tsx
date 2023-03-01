import React, { useEffect, useState } from "react";
import { Button, Typography, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
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

  const MyTypography = styled(Typography)(() => ({
    minWidth: "140px",
    backgroundColor: "rgb(14,23,36)",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
    marginBottom: "7px",
  }));

  const MyBox = styled(Box)(() => ({
    display: "flex",
    flexWrap: "wrap",
  }));

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 134px)",
        backgroundColor: "rgb(206, 255, 159)",
        paddingBottom: "30px",
        color: "black",
      }}
    >
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" sx={{ textShadow: "1px 1px black" }}>
          {t("titleHome")}
        </Typography>
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
            <MyTypography sx={{ marginRight: "15px" }}>{city}</MyTypography>
            <MyTypography>{date}</MyTypography>
          </Box>
          <MyBox>
            <MyTypography sx={{ marginRight: "15px" }}>
              {t("temp")}
            </MyTypography>
            <MyTypography>{temp}&deg;C</MyTypography>
          </MyBox>
          <MyBox>
            <MyTypography sx={{ marginRight: "15px" }}>
              {t("pressure")}
            </MyTypography>
            <MyTypography>{pressure}</MyTypography>
          </MyBox>
          <MyBox>
            <MyTypography sx={{ marginRight: "15px" }}>
              {t("speed")}
            </MyTypography>
            <MyTypography>{speed}m/s</MyTypography>
          </MyBox>
          <MyBox>
            <MyTypography sx={{ marginRight: "15px" }}>
              {t("desc")}
            </MyTypography>
            <MyTypography>{desc}</MyTypography>
          </MyBox>
        </Box>
      ) : null}
    </Box>
  );
}
