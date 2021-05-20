ssh jdgalaz@mazinger.ing.puc.cl "cd /home/jdgalaz/work/03_biobio2010/geoclaw; sbatch plot_in_cluster.sh" > plot_job_number.log
echo "plot job number (plot_job_number.log):" $(cat plot_job_number.log)