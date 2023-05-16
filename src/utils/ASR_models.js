export const asr_model_info = {
  English: [
    {
      name: "dataset",
      value: "Librispeech 960h",
      url: "https://www.openslr.org/12",
    },
    {
      name: "tag",
      value: "asapp/e_branchformer_librispeech",
      url: "https://huggingface.co/asapp/e_branchformer_librispeech",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "E-Branchformer(17)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "result",
      url: "https://github.com/espnet/espnet/tree/master/egs2/librispeech/asr1#e-branchformer",
    },
  ],
  Bengali: [
    {
      name: "dataset",
      value: "Large bengali ASR training dataset",
      url: "https://openslr.org/53/",
    },
    {
      name: "tag",
      value: "espnet/bn_openslr53",
      url: "https://huggingface.co/espnet/bn_openslr53",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "Transformer(12)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "results",
      url: "https://github.com/espnet/espnet/tree/master/egs2/bn_openslr53/asr1#results",
    },
  ],
  Chinese: [
    {
      name: "dataset",
      value: "AISHELL-ASR0009-OS1 Open Source Mandarin Speech Corpus",
      url: "https://www.aishelltech.com/kysjcp",
    },
    {
      name: "tag",
      value: "pyf98/aishell_e_branchformer",
      url: "https://huggingface.co/pyf98/aishell_e_branchformer",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "E-Branchformer(12)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "branchformer-initial",
      url: "https://github.com/espnet/espnet/tree/master/egs2/aishell/asr1#branchformer-initial",
    },
  ],
  French: [
    {
      name: "dataset",
      value: "Swiss French Polyphone corpus",
      url: "http://catalog.elra.info/en-us/repository/browse/ELRA-S0030_02/",
    },
    {
      name: "tag",
      value:
        "adolfvonkleist/polyphone_swiss_french_asr_train_asr_conformer_raw_bpe800_sp_valid.acc.ave",
      url: "https://zenodo.org/record/4319575#.ZGOSDJHP1H4",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "Conformer(12)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "asr_train_asr_conformer_raw_bpe800_spl",
      url: "https://github.com/espnet/espnet/tree/master/egs2/polyphone_swiss_french/asr1#asr_train_asr_conformer_raw_bpe800_spl",
    },
  ],
  Nahuatl: [
    {
      name: "dataset",
      value:
        "Highland Puebla Nahuatl corpus (endangered language in central Mexico)",
      url: "https://www.openslr.org/92/",
    },
    {
      name: "tag",
      value: "espnet/ftshijt_espnet2_asr_puebla_nahuatl_transfer",
      url: "https://huggingface.co/espnet/ftshijt_espnet2_asr_puebla_nahuatl_transfer",
    },
    {
      name: "Frontend",
      value: "HuBERT",
    },
    {
      name: "Encoder",
      value: "Transformer(12)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "result",
      url: "https://github.com/espnet/espnet/blob/master/egs2/puebla_nahuatl/asr1/RESULTS.md#result",
    },
  ],
  Japanese: [
    {
      name: "dataset",
      value: "Japanese speech corpus of Saruwatari-lab., University of Tokyo",
      url: "https://sites.google.com/site/shinnosuketakamichi/publication/jsut",
    },
    {
      name: "tag",
      value: "pyf98/jsut_e_branchformer",
      url: "https://huggingface.co/pyf98/jsut_e_branchformer",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "E-Branchformer(16)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "e-branchformer",
      url: "https://github.com/espnet/espnet/tree/master/egs2/jsut/asr1#e-branchformer",
    },
  ],
  Korean: [
    {
      name: "dataset",
      value: "KsponSpeech (Korean spontaneous speech) corpus",
      url: "https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=realm&dataSetSn=123",
    },
    {
      name: "tag",
      value:
        "Yushi Ueda/ksponspeech_asr_train_asr_conformer8_n_fft512_hop_length256_raw_kr_bpe2309_valid.acc.best",
      url: "https://zenodo.org/record/5154341#.ZGOV9pHP1H4",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "Conformer(12)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "conformertransformer-lm",
      url: "https://github.com/espnet/espnet/tree/master/egs2/ksponspeech/asr1#conformertransformer-lm",
    },
  ],
  Russian: [
    {
      name: "dataset",
      value: "Russian Open Speech To Text (STT/ASR) Dataset",
      url: "https://github.com/snakers4/open_stt",
    },
    {
      name: "tag",
      value:
        "Pavel Denisov/ru_open_stt_asr_train_asr_conformer_raw_ru_bpe100_valid.acc.ave",
      url: "https://zenodo.org/record/4541727#.ZGOZBJHP1H4",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "Conformer(12)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "the-first-conformer-result",
      url: "https://github.com/espnet/espnet/tree/master/egs2/ru_open_stt/asr1#the-first-conformer-result",
    },
  ],
  Sinhala: [
    {
      name: "dataset",
      value: "Sinhala speech recognition corpus",
      url: "https://drive.google.com/file/d/17_e0JhMW4_FPxfh93foplnxb4OQp8zh3/view",
    },
    {
      name: "tag",
      value: "espnet/Karthik_sinhala_asr_train_asr_transformer",
      url: "https://huggingface.co/espnet/Karthik_sinhala_asr_train_asr_transformer",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "Conformer(12)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "result",
      url: "https://github.com/espnet/espnet/tree/master/egs2/sinhala/asr1#using-transformer-based-encoder-decoder-predicting-transcript-along-with-intent",
    },
  ],
  Sundanese: [
    {
      name: "dataset",
      value: "Large Sundanese ASR training data set",
      url: "http://www.openslr.org/36",
    },
    {
      name: "tag",
      value: "su_openslr36",
      url: "https://zenodo.org/record/5090135#.ZGOacJHP1H4",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "Conformer(12)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "result",
      url: "https://github.com/espnet/espnet/tree/master/egs2/su_openslr36/asr1#results",
    },
  ],
  Totonac: [
    {
      name: "dataset",
      value: "Highland Totonac corpus (endangered language in central Mexico)",
      url: "http://www.openslr.org/107/",
    },
    {
      name: "tag",
      value: "espnet/ftshijt_espnet2_asr_totonac_transformer",
      url: "https://huggingface.co/espnet/ftshijt_espnet2_asr_totonac_transformer",
    },
    {
      name: "Frontend",
      value: "DefaultFrontend",
    },
    {
      name: "Encoder",
      value: "Conformer(12)",
    },
    {
      name: "Decoder",
      value: "Transformer(6)",
    },
    {
      name: "Metrics",
      value: "result",
      url: "https://github.com/espnet/espnet/blob/master/egs2/totonac/asr1/RESULTS.md#results",
    },
  ],
};
