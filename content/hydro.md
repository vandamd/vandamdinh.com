+++
title = "A brief explanation of the Python code for the Pumped Hydro System"
slug = "hydro-explanation"
date = "2023-02-08"
+++

This is going to be an informal explanation of how the code works, I'm
gonna formalise it with diagrams and stuff later on. I've tried my best
to condense it down, it's still pretty long so sorry about that!

**All of the code can be found in the [GitHub
Repository](https://github.com/vandamd/MDM2-Hydro). Please do look at
the code for the calculations, I've not included them here as it'd be
awfully long!**

The code is split into two main components, the **Pump** and the **Turbine**.
There is a file for each component, `pump.py` and `dump.py` respectively.
The main function to call is called `pumpWater()` and `dumpWater()`, and
within those functions they call other functions that calculate various
things.

---

## Pumping Water Function - `pumpWater()`
`pumpWater()` takes the following inputs:

1. `initialTankDepth` - The initial depth of the tank that is full
2. `initialVolume` - The initial volume of water in the tank that is full
3. `baseToBase` - The distance between the base of the top tank and the
   base of the bottom tank
4. `pumpPower` - The power of the pump
5. `surfaceArea` - The surface area of the tanks
6. `innerDiameter` - The inner diameter of the pipe

`pumpWater()` takes the following outputs:

1. `totalHeads` - The array of heads calculated at each time step
2. `topRates` - The array of flow rates of the pump at each time step   
3. velocities - The array of velocities of the water in the pipe at each
   time step
4. `topVolumes` - The array of volumes of water in the top tank at each
   time step
5. `bottomVolumes` - The array of volumes of water in the bottom tank at
   each time step
6. `topDepths` - The array of depths of water in the top tank at each time
   step

---

### Calculating the Head - `pTotalHead()`
The function takes the following inputs:

1. `velocities[i]` - The velocity of the water in the pipe at the current
   time step
2. `topDepths[i]` - The depth of the water in the top tank at the current
   time step
3. `maximumDepth` - The maximum depth of the tank, basically the same
   value as the initial depth of the tank
4. `baseToBase` - Explained above in the `pumpWater()` function
5. `innerDiameter` - Explained above aswell

#### Method
1. Firstly, the static head is calculated using the following equation:

    `H_s = baseToBase + topDepth - (maximumDepth - topDepth)`
    
    - The static head is the head that is created by the height
      difference between the two tanks. Therefore, they stay constant
      throughout.
    
2. Next, is the head losses. The head losses are calculated using the
   following equation:
    
    `H_L = f * (baseToBase)/(innerDiameter) * (velocity)/(2 * g)`

    - The head losses are the losses that occur due to friction in the
      pipe
    - `f` is the friction factor of the pipe. We can change this value
      inside of the `constants.py` file.
    - `g` is the gravitational constant. We can change this value inside
      of the `constants.py` file but we probably don't need to!
    - This is essentially just the equation Rachel put together
    
3. Next, the dynamic head is calculated by using the following
   equation:
    
    `H = H_s + H_L`
    
4. Finally, the function then returns `H`.

--- 

### Calculating the Flow Rate - `topRate()`
The function takes the following inputs:
1. `inputPower` - The same as `pumpPower`, explained in the inputs of
   `pumpWater()`
2. `H` - The head in the system at the current time step, we use the
   recently calculated value from the `pTotalHead()` function

The flow-rate is calculated using the following equation:

`flowrateToTop = (inputPower * pumpEfficiency) / (waterDensity * g * H)`
    
- This is equation (3) from the referenced [Paper (15)](https://www.sciencedirect.com/science/article/pii/S0306261919304064)
- `inputPower` is the power of the pump
- `pumpEfficiency` is the efficiency the pump that is defined in the
  `constants.py` file, we may want to fine tune this value
- `waterDensity` is the density of water, defined in the `constants.py`
- `g` is the gravitational constant, defined in the `constants.py` file
- `H` is the head in the system at the current time step

`flowrateToTop` is then returned.

---

### Calculating the Velocity - `velocityUp()`
The function takes the following inputs:

1. `flowrateToTop` - The flow rate of the water in the pipe at the current
   time step
2. `innerDiameter` - The inner diameter of the pipe, explained above

The velocity is calculated using the following equation:
    
`velocityUp = (flowrateToTop / (math.pi * ((0.5 * innerDiameter) ** 2)))`
    
- This equation is acquired by just shifting units from `m^3/s` to `m/s` by
  dividing the flow rate by the area of the pipe
- `flowrateToTop` is the flow rate of the water in the pipe at the current
  time step, we use the recently calculated value from the `topRate()`
  function
- The denominator is the area of the pipe, which is calculated by using
  the inner diameter of the pipe

`velocityUp` is then returned.

---

### Calculating the Volume in the top tank - `pTopVolume()`
The function takes the following inputs:

1. `flowRates` - The array of flow rates
2. `lastVolume` - The volume of the water in the top tank at the
   previous time step
3. `maximumVolume` - The maximum volume of the top tank, just the same
   value as the initial volume of the bottom tank

The volume is calculated using the following equation:

`volume = lastVolume + (flowRates[-1] * dt)`
    
- This equation is taking the last calculated volume and adding the
  volume of water that has been pumped up at the current time step
- `flowRates[-1]` is the flow rate of the water in the pipe at the current
  time step, we use the recently calculated value from the `topRate()`
  function
- `dt` is the time step, I've just defined it as 1 second for now
- I made it so that if the value of volume is less than zero or is
  greater than the maximum volume, then the volume is set to zero or
      the maximum volume respectively

`volume` is then returned.

---

### Calculating the Volume in the bottom tank - `pBottomVolume()`
The function is essentially the same as the `pTopVolume()` function, but
instead of adding the flow rate of the water in the pipe, we subtract
it. 

The function also does the same checks, if the volume is less than zero
or greater than the maximum volume, then it is set to zero or the 
maximum volume respectively.

---

### Calculating the Depth in the top tank
I don't use a function to calculate the depth, this is because I want to
manipulate some of the values inside of the arrays within the function, 
(the flow rate and velocity).

The depth is calculated with the following equation:

`topDepth = topVolumes[i] * surfaceArea`
    
- This equation is just taking the volume of the water in the top tank
  and multiplying it by the surface area of the tank
- `topVolumes[i]` is the volume of the water in the top tank at the
  current time step, we use the recently calculated value from the
  `pTopVolume()` function
- `surfaceArea` is the surface area of the tank, we gave this value as an
  input to the `pumpWater()` function
- If the depth is greater than the maximum depth, then the depth is set
  to the maximum depth, the flow rate and velocity are set to zero as
  well.

`topDepth` is then returned.

---

## The pumping water function - `pumpWater()`

When you put everything together, the final function looks like this:

```python
# Pump.py

def pumpWater(initialTankDepth, initialVolume, baseToBase, pumpPower, surfaceArea, innerDiameter):
    totalHeads = []
    topRates = []
    velocities = [0,]
    topDepths = [0,]
    topVolumes = [0, ] 
    bottomVolumes = [initialVolume, ]
    maximumDepth = initialTankDepth
    
    for i in range(len(t)):
        totalHeads.append(pTotalHead(velocities[i], topDepths[i], maximumDepth, baseToBase, innerDiameter))
        topRates.append(topRate(pumpPower, totalHeads[i]))
        velocities.append(velocityUp(topRates[i], innerDiameter))
        topVolumes.append(pTopVolume(topRates, topVolumes[i-1], initialVolume))
        bottomVolumes.append(pBottomVolume(topRates, bottomVolumes[i-1], initialVolume))

        topDepth = topVolumes[i] * surfaceArea

        if topDepth >= maximumDepth:
            topDepth = maximumDepth
            topRates[-1] = 0
            velocities[-1] = 0
        
        topDepths.append(topDepth)

    return totalHeads, topRates, velocities, topVolumes, bottomVolumes, topDepths
```

It initialises the array of values we want to create, some are
completely empty initially, others are initialised with a value, such as
velocity, since we know the initial velocity is zero, and it can't just
be 'nothing'.

Each calculation in the `for` loop is entirely dependent on the previous
calculations made!

---

## The dumping water function - `dumpWater()`

The dumping water function is pretty similar to the pumping water
function, it shares a lot of the same types of calculations, but I won't
go too in depth with it since this is already pretty long!

We're using different equations for the flow rate and velocity: 

```python
flowrateToTurbine = (Tv / 100) * (math.pi * (0.5 * innerDiameter) ** 2) * ((2 * g * H) ** 0.5)
```


```python
velocity = (2 * g * head) ** 0.5
```

We use `pTopVolume()` and `pBottomVolume()`, they're basically the same
but they're renamed to `dTopVolume()` and `dBottomVolume()`. The
calculations are also negated since we're dumping water instead of
pumping it.

The whole function looks like this:

```python
# Dump.py

def dumpWater(initialTankDepth, initialVolume, baseToBase, surfaceArea, innerDiameter, turbineOpeness):
    totalHeads = []
    bottomRates = []
    velocities = [0,]
    topDepths = [initialTankDepth,]
    topVolumes = [initialVolume, ] 
    bottomVolumes = [0, ]
    maximumDepth = initialTankDepth

    for i in range(len(t)):
        totalHeads.append(dTotalHead(velocities[i], topDepths[i], maximumDepth, baseToBase, innerDiameter))
        bottomRates.append(bottomRate(innerDiameter, totalHeads[i], turbineOpeness))
        velocities.append(velocityDown(totalHeads[i-1]))
        topVolumes.append(dTopVolume(bottomRates, topVolumes[i-1], initialVolume))
        bottomVolumes.append(dBottomVolume(bottomRates, bottomVolumes[i-1], initialVolume))

        topDepth = topVolumes[i] * surfaceArea

        if topDepth <= 0:
            topDepth = 0
            bottomRates[-1] = 0
            velocities[-1] = 0

        topDepths.append(topDepth)

    return totalHeads, bottomRates, velocities, topVolumes, bottomVolumes, topDepths

```

---

## Pretty Graphs!
For these examples I'm using these constants:

```python
depth = 1
volume = 1.2
distance = 13
pumpPower = 10
surfaceArea = 1
innerDiameter = 0.1
turbineOpeness = 0.2
```

```python
# constants.py

# Pipe Attributes
f = 0.01                                                    # Friction factor

# Pump Attributes
pumpEfficiency = 0.8                                        # Pump efficiency

# Environment Attributes
g = 9.81                                                    # Gravity
timeSpan = 86400                                            # In seconds
t = np.linspace(0,timeSpan,timeSpan)                        # Time span in seconds (24 hours)
waterDensity = 997                                          # Density of water in kilograms per cubic meter
```

### Pumping Water
![Pumping Water](/blog/pumping.png)

### Dumping Water
![Dumping Water](/blog/dumping.png)

Do note the amount of time each process takes. Pumping takes 11ish
hours? Whilst dumping takes nearly 3 hours? Is that realistic? We can
probably play around with constants together to make it more realistic!

## Moving Forward
Energy/power usage still needs to be implemented, so I'll probably start
doing that soon! I just want to verify that everything looks correct
with you guys, let me know if you have any questions or if you think
something is wrong!


