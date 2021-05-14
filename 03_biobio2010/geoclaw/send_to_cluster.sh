LOGIN=jdgalaz@mazinger.ing.puc.cl

LOCAL_DATA_FOLDER_PATH=$(pwd)/../data
REMOTE_DATA_FOLDER_PATH="~"/03_biobio2010/data/

function send_data_file {
  if ssh $LOGIN stat $REMOTE_DATA_FOLDER_PATH/$1 \> /dev/null 2\>\&1; then
    echo $1 "exists"
  else
    ssh jdgalaz@mazinger.ing.puc.cl mkdir -p $REMOTE_DATA_FOLDER_PATH
    scp $LOCAL_DATA_FOLDER_PATH/$1 jdgalaz@mazinger.ing.puc.cl:$REMOTE_DATA_FOLDER_PATH/$1
  fi

}

send_data_file topography3min.tt2
send_data_file earthquake.tt3