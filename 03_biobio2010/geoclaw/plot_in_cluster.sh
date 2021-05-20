#!/bin/bash

#SBATCH --job-name=chile2010
#SBATCH --partition=full
#SBATCH --mail-type=FAIL,END
#SBATCH --mail-user=jdgalaz@uc.cl
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1

export CLAW=/home/jdgalaz/clawpack-v5.7.1

make plots