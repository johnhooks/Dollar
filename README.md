# Johns TypeScript Dollar Implementation

## Purpose
I created this module to write my own payroll system. Dollar values
are stored as integers ($VALUE * 100). Factions of a cent below .005
are rounded down, otherwise rounded up.