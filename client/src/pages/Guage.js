// eslint-disable-next-line
import React, { useState, PureComponent, useEffect, Component } from "react";
// eslint-disable-next-line
import API from "../utils/API";

//import Switch from '@material-ui/core/Switch';
import CircularGauge, { Geometry, Scale as CircularScale, Size as CircularSize, ValueIndicator as CircularValueIndicator } from 'devextreme-react/circular-gauge';
import Indicator from '../components/Indicator';

import Bulb from 'react-bulb';

const color = '#f05b41';

function Guages() {

    const [engineRpm, setEngineRpm] = useState(0);
    const [oilPressure, setOilPressure] = useState(0);
    const [engineHours, setEngineHours] = useState(0);
    const [coolantTemp, setCoolantTemp] = useState(0);
    const [headPosition, setHeadPosition] = useState(0);
    const [holeDepth, setHoleDepth] = useState(0);
    const [rotationRpm, setRotationRpm] = useState(0);
    const [penetrationRate, setPenetrationRate] = useState(0);
    const [mastAngle, setMastAngle] = useState(0);
    const [deckRoll, setDeckRoll] = useState(0);
    const [deckPitch, setDeckPitch] = useState(0);
    const [headBackRack, setHeadBackRack] = useState("");
    const [footClamp, setFootClamp] = useState("");
    const [coolantLevel, setCoolantLevel] = useState("");
    const [rotationReversePressure, setRotationReversePressure] = useState(0);
    const [rotationForwardPressure, setRotationForwardPressure] = useState(0);
    const [holdback, setHoldback] = useState(0);
    const [pulldown, setPulldown] = useState(0);
    const [waterPressure, setWaterPressure] = useState(0);
    const [mainPump, setMainPump] = useState(0);
    const [winchDown, setWinchDown] = useState(0);
    const [winchUp, setWinchUp] = useState(0);
    const [bitWeight, setBitWeight] = useState(0);
    const [driller, setDriller] = useState(0);
    const [count, setCount] = useState(0);

    const getData = async () => {

        const lastEntry = await API.getLastEntry();
        console.log(lastEntry);
        setEngineRpm(lastEntry[0].engineRPM || 0);
        setOilPressure(lastEntry[0].oilPressure || 0);
        setEngineHours(lastEntry[0].engineHours || 0);
        setCoolantTemp(lastEntry[0].coolantTemp || 0);
        setHeadPosition(lastEntry[0].headPosition || 0);
        setHoleDepth(lastEntry[0].holeDepth || 0);
        setRotationRpm(lastEntry[0].rotationRpm || 0);
        setPenetrationRate(lastEntry[0].penetrationRate || 0);
        setMastAngle(lastEntry[0].mastAngle || 0);
        setDeckRoll(lastEntry[0].deckRoll || 0);
        setDeckPitch(lastEntry[0].deckPitch || 0);
        setMainPump(lastEntry[0].mainPumpPressure || 0);
        setRotationReversePressure(lastEntry[0].rotationReversePressure || 0);
        setRotationForwardPressure(lastEntry[0].rotationForwardPressure || 0);
        setHoldback(lastEntry[0].holdBackPressure || 0);
        setPulldown(lastEntry[0].pulldownPressure || 0);
        setWaterPressure(lastEntry[0].waterPressure || 0);
        setWinchUp(lastEntry[0].winchUpPressure || 0);
        setWinchDown(lastEntry[0].winchDownPressure || 0);
        setBitWeight(lastEntry[0].bitWeight || 0);
        setDriller(lastEntry[0].driller || 0);

        //  

        /// BOOLEANS
        if (lastEntry[0].coolantLevelSensor === false) {
            setCoolantLevel("red");
        } else {
            setCoolantLevel("green");
        }

        if (lastEntry[0].footClampPressureSwitch === false) {
            setFootClamp("red");
        } else {
            setFootClamp("green");
        }

        if (lastEntry[0].headBackRackProxyStatus === false) {
            setHeadBackRack("red");
        } else {
            setHeadBackRack("green");
        }
    }

    useEffect(() => {

        let timer = setInterval(() => {
            getData()
        }, 1000);

        return () => {
            clearInterval(timer)
        }

    }, [])

    const largeGuage = document.getElementById("guage-container");

    console.log("Total Width: ", window.screen.width)
    console.log("test: ", window.outerWidth)

    return (
        <React.Fragment>

            {(window.outerWidth > 1500) ?
                <React.Fragment>
                    <div id="gauge-demo">
                        <img src={require("../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" />
                        <div id="gauge-container">
                            <div className="left-section">
                                <Indicator
                                    value={parseInt(engineRpm)}
                                    inverted={false}
                                    startAngle={180}
                                    endAngle={90}
                                    color={color}
                                />
                                <p>Engine RPM</p>
                                <Indicator
                                    value={parseInt(oilPressure)}
                                    inverted={true}
                                    startAngle={-90}
                                    endAngle={-180}
                                    color={color}
                                />
                                <p>Oil Pressure</p>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={parseInt(waterPressure)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{waterPressure}</span>
                                </div>
                                <h4 className="GaugeTitle">Water Pressure</h4>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={parseInt(mainPump)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={100}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{mainPump}</span>
                                </div>
                                <h4 className="GaugeTitle">Rotation Pressure</h4>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={parseInt(bitWeight)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={20}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{bitWeight}</span>
                                </div>
                                <h4 className="GaugeTitle">Bit Weight</h4>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={parseInt(penetrationRate)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={20}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{penetrationRate}</span>
                                </div>
                                <h4 className="GaugeTitle">Penetration Rate</h4>
                            </div>
                    &nbsp;
                    <div className="right-section">
                                <div className="coolantLevel">
                                    <p className="coolantLevel">Coolant Level</p>
                                    <Bulb
                                        color={coolantLevel}
                                        size={10}
                                    />
                                </div>
                                <Indicator
                                    value={parseInt(coolantTemp)}
                                    inverted={true}
                                    startAngle={90}
                                    endAngle={0}
                                    color={color}
                                />
                                <p>Coolant Temp</p>
                                <Indicator
                                    value={parseInt(mainPump)}
                                    inverted={false}
                                    startAngle={0}
                                    endAngle={-90}
                                    color={color}
                                />
                                <p>Main Pump</p>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo">
                        <div id="gauge-container">
                            <div className="left-section">
                                <div className="sideGauge placeholder">
                                    <p></p>
                                </div>
                                <div className="sideGauge">
                                    <p>Head Position</p>
                                    <h4>{headPosition} mm</h4>
                                </div>
                                <div className="sideGauge">
                                    <p>Hole Depth</p>
                                    <h4>{holeDepth} m</h4>
                                </div><div className="sideGauge">
                                    <p>Driller ID</p>
                                    <h6>{driller}</h6>
                                </div>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={parseInt(holdback)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={400}
                                        tickInterval={50}
                                        minorTickInterval={10}

                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{parseInt(holdback)}</span>
                                </div>
                                <h4 className="GaugeTitle">Holdback Pressure</h4>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={parseInt(pulldown)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={50}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{parseInt(pulldown)}</span>
                                </div>
                                <h4 className="GaugeTitle">PullDown Pressure</h4>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={parseInt(rotationRpm)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={30}
                                        tickInterval={2}
                                        minorTickInterval={10}

                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{parseInt(rotationRpm)}</span>
                                </div>
                                <h4 className="GaugeTitle">Head RPM</h4>
                            </div>
                &nbsp;
                    <div className="right-section">
                                <div className="sideGauge placeholder">
                                    <p></p>
                                </div>
                                <div className="sideGauge">
                                    <p>Head Rack Back</p>
                                    <Bulb
                                        color={headBackRack}
                                        size={10}
                                    />
                                </div>
                                <div className="sideGauge">
                                    <p>Foot Clamp</p>
                                    <Bulb
                                        color={footClamp}
                                        size={10}
                                    />
                                </div>
                                <div className="sideGauge">
                                    <p>Engine Hours</p>
                                    <h4>{engineHours} Hrs</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                :
                // Mobile
                <React.Fragment>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(waterPressure)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{waterPressure}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Water Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(rotationForwardPressure)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={100}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{rotationForwardPressure}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Rotation Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(bitWeight)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={20}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{bitWeight}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Bit Weight</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(penetrationRate)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={20}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{penetrationRate}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Penetration Rate</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(holdback)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={400}
                                        tickInterval={50}
                                        minorTickInterval={10}

                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{parseInt(holdback)}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Holdback Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(pulldown)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={400}
                                        tickInterval={50}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{parseInt(pulldown)}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">PullDown Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(rotationRpm)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={30}
                                        tickInterval={2}
                                        minorTickInterval={10}

                                    />
                                    <Geometry startAngle={225} endAngle={315} />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={0.4}
                                        color="none"
                                        secondColor={color}
                                        width={5}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{parseInt(rotationRpm)}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Head RPM</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={engineRpm}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{engineRpm}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Engine RPM</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={oilPressure}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{oilPressure}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Oil Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={coolantTemp}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{coolantTemp}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Coolant Temp</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={mainPump}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{mainPump}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Main Pump Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="infoContainer">
                        <div className="row">
                            <div className="col-12 drillStats">
                                <h6>Driller ID</h6>
                                <h1>{driller}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 drillStats">
                                <h6>Head Position</h6>
                                <h1>{headPosition}</h1>
                            </div>
                            <div className="col-12 col-sm-6 drillStats">
                                <h6>Hole Depth</h6>
                                <h1>{holeDepth}</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-sm-6 drillStats">
                                <h6>Driller ID</h6>
                                <h1>{driller}</h1>
                            </div>
                            <div className="col-12 col-sm-6 drillStats">
                                <h6>Engine Hours:</h6>
                                <h1>{engineHours} Hrs</h1>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default Guages;