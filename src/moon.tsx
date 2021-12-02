import * as React from "react";
import { withStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const style = ({ palette, spacing }: Theme) =>
	createStyles({
		root: {
			flex: 1,
			display: "flex",
			width: "100%",
			height: "100%",
		},
		container: {
			flex: 1,
			display: "flex",
			flexDirection: "column",
		},
		grid: {
			flex: 1,
			display: "inline-grid",
			gridTemplateColumns: "repeat(7, 1fr)",
			padding: "20px",
		},
		gridWeekDay: {
			display: "inline-grid",
			gridTemplateColumns: "repeat(7, 1fr)",
			paddingTop: "20px",
			paddingLeft: "20px",
			paddingRight: "20px",
		},
		header: {
			textAlign: "center",
			backgroundColor: "#000 !important",
			color: "#FFF !important",
		},
		cell: {
			gridColumnEnd: "span 1",
			display: "flex",
			flexDirection: "row",
			border: "solid #333",
			borderWidth: "1px",
			padding: "10px",
		},
		cellLabel: {
			display: "flex",
			justifyContent: "center",
		},
		cellToday: {
			display: "flex",
			flexDirection: "row",
			border: "solid #333",
			borderWidth: "1px",
			padding: "10px",
			backgroundColor: "#111",
		},
		month: {
			fontSize: "1em",
			fontFamily: "Playfair Display",
		},
		label: {
			fontSize: "1em",
			fontFamily: "Playfair Display",
		},
		date: {
			fontSize: "1em",
			fontFamily: "Playfair Display",
			paddingRight: "5px",
		},
		moon: {
			fontSize: "1em",
			fontFamily: "Playfair Display",
		},
		mobileStepper: {
			fontSize: "1em",
			fontFamily: "Playfair Display",
			backgroundColor: "#000 !important",
			color: "#FFF !important",
		},
		direction: {
			fontSize: "1em",
			fontFamily: "Playfair Display",
		},
	});

const daysInMonth = (iMonth: number, iYear: number) => {
	return 32 - new Date(iYear, iMonth, 32).getDate();
};

const Moon = (year: number, month: number, day: number) => {
	const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];

	let c: number = 0;
	let e: number = 0;
	let jd: number = 0;
	let b: number = 0;

	if (month < 3) {
		year--;
		month += 12;
	}

	++month;

	c = 365.25 * year;
	e = 30.6 * month;
	jd = c + e + day - 694039.09; // jd is total days elapsed
	jd /= 29.5305882; // divide by the moon cycle
	b = Math.floor(jd); // int(jd) -> b, take integer part of jd
	jd -= b; // subtract integer part to leave fractional part of original jd
	b = Math.round(jd * 8); // scale fraction from 0-8 and round

	if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0

	return { phase: b, emoji: phases[b] };
};

interface Day {
	label: String;
	date: number;
}

interface IProps {
	classes: any;
	theme: any;
}

const MoonComponent = (props: IProps) => {
	const today = new Date();
	const [activeStep, setActiveStep] = React.useState(today.getMonth());
	const { classes, theme } = props;

	const monthLabels = [
		"Januari",
		"Februari",
		"Mars",
		"April",
		"Maj",
		"Juni",
		"Juli",
		"Augusti",
		"September",
		"Oktober",
		"November",
		"December",
	];
	const weekDayLabels = [
		"Måndag",
		"Tisdag",
		"Onsdag",
		"Torsdag",
		"Fredag",
		"Lördag",
		"Söndag",
	];

	let year: number = today.getFullYear();
	let row: Array<Day> = [];
	let rows: Array<Array<Day>> = [];

	const months: Array<Array<Array<Day>>> = [];

	for (let month: number = 0; month <= 11; month++) {
		rows = [];

		let firstDay = new Date(year, month).getDay();
		let date: number = 1;

		for (let i: number = 0; i < 5; i++) {
			row = [];

			for (let j: number = 0; j < 7; j++) {
				if (i === 0 && j < firstDay - 1) {
					row.push({ label: "", date: -1 });
				} else if (date > daysInMonth(month, year)) {
					row.push({ label: "", date: -1 });
				} else {
					row.push({ label: Moon(year, month, date).emoji, date });

					date++;
				}
			}

			rows.push(row);
		}

		months.push(rows);
	}

	const maxSteps = 12;

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const currentMonth = months[activeStep];
	const dayElements: Array<JSX.Element> = [];
	const weekDayLabelElements: Array<JSX.Element> = [];

	weekDayLabels.forEach((aWeekDay) => {
		weekDayLabelElements.push(
			<div
				key={activeStep + "_" + aWeekDay}
				className={classes.cellLabel}
			>
				<span className={classes.label}>{aWeekDay}</span>
			</div>
		);
	});

	currentMonth.forEach((row, rowIndex) => {
		row.forEach((day, dateIndex) => {
			if (day.date === -1) {
				dayElements.push(
					<div
						key={activeStep + "_" + rowIndex + "_" + dateIndex}
						className={classes.cell}
					/>
				);
			} else if (
				day.date === today.getDate() &&
				activeStep === today.getMonth()
			) {
				dayElements.push(
					<div
						key={
							activeStep +
							"_" +
							rowIndex +
							"_" +
							dateIndex +
							"_" +
							day.date
						}
						className={classes.cellToday}
					>
						<span className={classes.date}>{day.date}</span>
						<span className={classes.moon}>{day.label}</span>
					</div>
				);
			} else {
				dayElements.push(
					<div
						key={
							activeStep +
							"_" +
							rowIndex +
							"_" +
							dateIndex +
							"_" +
							day.date
						}
						className={classes.cell}
					>
						<span className={classes.date}>{day.date}</span>
						<span className={classes.moon}>{day.label}</span>
					</div>
				);
			}
		});
	});

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Paper square elevation={0} className={classes.header}>
					<span className={classes.month}>
						{monthLabels[activeStep]}
					</span>
				</Paper>
				<div className={classes.gridWeekDay}>
					{weekDayLabelElements}
				</div>
				<div className={classes.grid}>{dayElements}</div>
				<MobileStepper
					steps={maxSteps}
					position="static"
					variant="text"
					activeStep={activeStep}
					className={classes.mobileStepper}
					nextButton={
						<Button
							size="small"
							onClick={() => {
								handleNext();
							}}
							disabled={activeStep === maxSteps - 1}
						>
							<KeyboardArrowRight />
							<span>Next</span>
						</Button>
					}
					backButton={
						<Button
							size="small"
							onClick={() => {
								handleBack();
							}}
							disabled={activeStep === 0}
						>
							<KeyboardArrowLeft />
							<span className={classes.direction}>Back</span>
						</Button>
					}
				/>
			</div>
		</div>
	);
};

export default withStyles(style, { withTheme: true })(MoonComponent);
