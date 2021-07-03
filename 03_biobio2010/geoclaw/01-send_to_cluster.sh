LOGIN=jdgalaz@mazinger.ing.puc.cl

LOCAL_DATA_FOLDER_PATH=$(pwd)/../data
REMOTE_DATA_FOLDER_PATH="~"/work/03_biobio2010/data/

LOCAL_SCRIPTS_FOLDER_PATH=$(pwd)
REMOTE_SCRIPTS_FOLDER_PATH="~"/work/03_biobio2010/geoclaw/

function send_data_file {
  if ssh $LOGIN stat $REMOTE_DATA_FOLDER_PATH/$1 \> /dev/null 2\>\&1; then
    echo $1 "exists"
  else
    ssh jdgalaz@mazinger.ing.puc.cl mkdir -p $REMOTE_DATA_FOLDER_PATH
    scp $LOCAL_DATA_FOLDER_PATH/$1 jdgalaz@mazinger.ing.puc.cl:$REMOTE_DATA_FOLDER_PATH/$1
  fi

}

function send_script_file {
  ssh jdgalaz@mazinger.ing.puc.cl mkdir -p $REMOTE_SCRIPTS_FOLDER_PATH
  scp $LOCAL_SCRIPTS_FOLDER_PATH/$1 jdgalaz@mazinger.ing.puc.cl:$REMOTE_SCRIPTS_FOLDER_PATH/$1
}

COPY=$1
if [ -n "${COPY}" ]; then
  echo "Copying files ..."
  send_data_file topography3min.tt2
  send_data_file earthquake.tt3

  send_script_file setrun.py
  send_script_file setplot.py
  send_script_file Makefile
  send_script_file run_in_cluster.sh
  send_script_file plot_in_cluster.sh
fi

ssh jdgalaz@mazinger.ing.puc.cl "cd "$REMOTE_SCRIPTS_FOLDER_PATH"; export CLAW=/home/jdgalaz/clawpack-v5.7.1; make" > make_logs.log
ssh jdgalaz@mazinger.ing.puc.cl "cd "$REMOTE_SCRIPTS_FOLDER_PATH"; sbatch run_in_cluster.sh" > job_number.log
echo "job number (job_number.log):" $(cat job_number.log)
read -p "Press enter to print make logs"
cat make_logs.log