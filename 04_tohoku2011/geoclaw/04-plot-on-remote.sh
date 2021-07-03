ssh jdgalaz@mazinger.ing.puc.cl "cd /home/jdgalaz/work/04_tohoku2011/geoclaw; sbatch plot_in_cluster.sh" > plot_job_number.log
echo "plot job number (plot_job_number.log):" $(cat plot_job_number.log)