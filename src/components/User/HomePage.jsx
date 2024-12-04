import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const cards = [
        {
            title: "Open to Apply Jobs",
            content: "This functionality allows to view all open to apply jobs",
            link: "/user-dashboard/jobs/openToApply",
        },
        {
            title: "Applied Jobs",
            content: "This functionality allows to view all applied jobs",
            link: "/user-dashboard/jobs/applied",
        },
        {
            title: "Not Applied Jobs",
            content: "This functionality allows to view all not applied jobs",
            link: "/user-dashboard/jobs/notApplied",
        },
        {
            title: "Shortlisted Jobs",
            content: "This functionality allows to view all shortlisted jobs",
            link: "/user-dashboard/jobs/shortlisted",
        },
        {
            title: "Rejected Job",
            content: "This functionality allows to view all rejected jobs",
            link: "/user-dashboard/jobs/not-shortlisted",
        },
        
    ];

    return (
        <>
        <Typography sx={{textAlign:'center', margin:'20px', fontWeight:'600'}} variant="h5">User dashboard</Typography>
        <Grid container spacing={2} sx={{ flex: 1, }}>
            
            {cards.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                        sx={{
                            transition: "transform 0.3s",
                            "&:hover": { transform: "scale(1.05)" },
                            height: "200px",
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#fffde7",
                        }}
                    >
                        <CardActionArea
                            component={Link}
                            to={card.link}
                            sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardContent
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <Typography variant="h5" component="div">
                                    {card.title}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {card.subtitle}
                                </Typography>
                                <Typography variant="body2">
                                    {card.content}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    );
};

export default HomePage;
