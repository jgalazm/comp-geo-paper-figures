
ssh jdgalaz@mazinger.ing.puc.cl 'squeue -o "%.10u %.10i %.10P %.20j %.11M %.10T %.4C %N" -S -t' | grep jdgalaz
read -p "Press enter to print logs"
job_number=`cat job_number.log | grep -o "[0-9.]\+"`
ssh jdgalaz@mazinger.ing.puc.cl "cat work/03_biobio2010/geoclaw/slurm-"$job_number".out"
echo "tail..."
ssh jdgalaz@mazinger.ing.puc.cl tail -f work/03_biobio2010/geoclaw/slurm-$job_number.out